import React, { act, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { updateUserInsideState } from '../store/userSlice';
import { updateUserDetailInDb } from '../utils/updateUserDetailsInDb';
function Profile() {
  const dispatch = useDispatch();

   // values from Redux store
   const nameFromStore = useSelector((state) => state.user.name);
   const emailFromStore = useSelector((state) => state.user.email);
   const mobileFromStore = useSelector((state) => state.user.mobile);

  const [userName , setUserName] = useState("");
  const [userEmail , setUserEmail] = useState("");
  const [userMobile , setUserMobile] = useState("");

  useEffect(() => {
    setUserName(nameFromStore || '');
    setUserEmail(emailFromStore || '');
    setUserMobile(mobileFromStore || '');
  }, [nameFromStore, emailFromStore, mobileFromStore]);

  console.log("userName",userName);
  console.log("userEmail",userEmail);
  console.log("userMobile",userMobile);

  //onSubmitHandler
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    const newUserData = {
      name : userName,
      email : userEmail,
      mobile : userMobile
    }
    const response = await updateUserDetailInDb(newUserData);
    if(response.success){
      toast.success(response.message);
      dispatch(updateUserInsideState(newUserData));
    }
    if(response.error){
      if(response.message == "Access token missing"){
        toast.error("Please Login First")
      }
      else{
        toast.error(response.message);
      }
    }
  }
  return (
    <>
    <div className='w-[85vw] h-[80vh] shadow flex flex-col'>

      {/* UPDATE AVATAR SECTION */}
        <div className='avatar flex gap-2 flex-col m-4'>
          <div className='w-[6vw] h-[6vw] bg-amber-300 rounded-full flex items-center justify-center text-center'>
          {/* <img src="" alt="loading" />
           */}
           AVATAR
          </div>
          <button className='border-amber-300 border-1 w-[6vw] rounded-2xl p-1 hover:bg-amber-300'>Edit</button>
        </div>

        {/* UPDATE NAME EMAIL PHONE  */}
        <form action="" className='flex flex-col m-5 gap-1' onSubmit={onSubmitHandler}>
          {/* NAME */}
          <label htmlFor="">Name</label>
          <input type="text" name='name' className='mt-1 p-2 bg-[#E8F0FE] border-gray-200 border-1 rounded focus:border-amber-300 focus:outline-none' onChange={(e)=>{setUserName(e.target.value)}}  value={userName} />
          {/* EMAIL */}
          <label htmlFor="">Email</label>
          <input type="email" name='email'  className='mt-1 p-2 bg-[#E8F0FE] border-gray-200 border-1 rounded focus:border-amber-300 focus:outline-none' onChange={(e)=>{setUserEmail(e.target.value)}} value={userEmail} />
          {/* MOBILE */}
          <label htmlFor="" >Mobile</label>
          <input type="number" name='mobile' className='mt-1 p-2 bg-[#E8F0FE] border-gray-200 border-1 rounded focus:border-amber-300 focus:outline-none'  onChange={(e)=>{setUserMobile(e.target.value)}} value={userMobile || 0} />
          {/* BUTTON */}
          <button className='mt-3 p-2 border-amber-300 font-bold hover:bg-amber-300 border-1 rounded text-amber-300 hover:text-black' >Submit</button>
        </form>
    </div>
    </>
  )
}

export default Profile;