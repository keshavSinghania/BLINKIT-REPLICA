import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { updateUserInsideState } from '../store/userSlice';
import { updateUserDetailInDb } from '../utils/updateUserDetailsInDb';
import fetchWithAuth from '../utils/fetchAuth';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const dispatch = useDispatch();

  // values from Redux store
  const nameFromStore = useSelector((state) => state.user.name);
  const emailFromStore = useSelector((state) => state.user.email);
  const mobileFromStore = useSelector((state) => state.user.mobile);
  const avatarFromStore = useSelector((state) => state.user.avatar);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUplaoding] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setUserName(nameFromStore || '');
    setUserEmail(emailFromStore || '');
    setUserMobile(mobileFromStore || '');
  }, [nameFromStore, emailFromStore, mobileFromStore]);

  console.log("userName", userName);
  console.log("userEmail", userEmail);
  console.log("userMobile", userMobile);
  console.log("userAvatar", userAvatar);

  //onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUserData = {
      name: userName,
      email: userEmail,
      mobile: userMobile
    }
    const response = await updateUserDetailInDb(newUserData);
    if (response.success) {
      toast.success(response.message);
      dispatch(updateUserInsideState(newUserData));
      navigate("/")
    }
    if (response.error) {
      if (response.message == "Access token missing") {
        toast.error("Please Login First")
      }
      else {
        toast.error(response.message);
      }
    }
  }

  //on avatar change handler 
  const onAvatarChangeHandler = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setImageFile(e.target.files[0]);
    console.log(image, imageFile)
    if (!image) {
      return
    }
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setUserAvatar(previewUrl)
    }
  }

  //avatar sending to backend
  const submitAvatarHandler = async (e) => {
    setIsUplaoding(true);
    console.log("submmitted")
    console.log("checking imageFile", imageFile);
    const formData = new FormData();
    formData.append("avatar", imageFile);
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_FETCH_URL}upload-avatar`
      const response = await fetchWithAuth(url, "PUT", { body: formData, isFormData: true });
      console.log(response);
      if (response.error) {
        toast.error(response.message);
      }
      if (response.success) {
        dispatch(updateUserInsideState(response?.data?.avatar))
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Problem while updating avatar");
      console.log(error)
      return
    } finally {
      setIsUplaoding(false);
      navigate("/")
    }
  }
  return (
    <>
      <div className='w-[85vw] h-[80vh] shadow flex flex-col'>

        {/* UPDATE AVATAR SECTION */}
        <div className='avatar flex gap-2 flex-col m-4'>
          <div className='w-[6vw] h-[6vw] bg-amber-300 rounded-full flex items-center justify-center text-center'>
            <img src={userAvatar || avatarFromStore} alt="avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <input id='avatar' onChange={onAvatarChangeHandler} type='file' className={`${userAvatar ? "hidden" : ""} border-black border-1 max-w-[10vw] rounded`} />
          <button onClick={submitAvatarHandler} disabled={isUploading} className={`cursor-pointer text-center px-4 py-2 rounded-xl  text-sm font-medium transition-all w-[10vw] ${userAvatar ? "bg-amber-300" : "hidden"}`}>Update</button>
          {isUploading && (
            <div className='absolute top-0 left-0 bg-[#c5c1c173] bg-opacity-50 z-50 flex justify-center items-center w-[100vw] h-[100vh]'>
              <div className='flex flex-col items-center justify-center '>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#FFC107"
                ariaLabel="loading"
                visible={true}
              />
              PLEASE WAIT FOR A WHILE
              </div>
            </div>
          )}
        </div>

        {/* UPDATE NAME EMAIL PHONE  */}
        <form action="" className='flex flex-col m-5 gap-1' onSubmit={onSubmitHandler}>
          {/* NAME */}
          <label htmlFor="">Name</label>
          <input type="text" name='name' className='mt-1 p-2 bg-[#E8F0FE] border-gray-200 border-1 rounded focus:border-amber-300 focus:outline-none' onChange={(e) => { setUserName(e.target.value) }} value={userName} />
          {/* EMAIL */}
          <label htmlFor="">Email</label>
          <input type="email" name='email' className='mt-1 p-2 bg-[#E8F0FE] border-gray-200 border-1 rounded focus:border-amber-300 focus:outline-none' onChange={(e) => { setUserEmail(e.target.value) }} value={userEmail} />
          {/* MOBILE */}
          <label htmlFor="" >Mobile</label>
          <input type="number" name='mobile' className='mt-1 p-2 bg-[#E8F0FE] border-gray-200 border-1 rounded focus:border-amber-300 focus:outline-none' onChange={(e) => { setUserMobile(e.target.value) }} value={userMobile || 0} />
          {/* BUTTON */}
          <button className='mt-3 p-2 border-amber-300 font-bold hover:bg-amber-300 border-1 rounded text-amber-300 hover:text-black' >Submit</button>
        </form>
      </div>
    </>
  )
}

export default Profile;