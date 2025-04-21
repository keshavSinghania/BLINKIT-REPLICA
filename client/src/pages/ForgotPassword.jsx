import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function ForgotPassword() {
const navigate = useNavigate();

  //to store data entered by user
  const [data, setData] = useState({email:""})

  const [loading , setLoading] = useState(false);
  //change handler 
  const changeHandler = (e)=>{
    setData({
      ...data,
      [e.target.name ] : e.target.value
    })
  }
  
  //function to send data to backend api 
  const submitHandler = async(e)=>{
    e.preventDefault();
    if(loading) return
    setLoading(true);
    //checking if email field empty
    if(!data.email){
      toast.error("Please provide email")
      setLoading(false);
    }
    try {
      const response = await fetch("http://localhost:8080/api/user/forgot-password",{
        method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
      })

      const result = await response.json();
      
      //if error
      if(result.error){
        toast.error(result.message);
        setLoading(false);
      }
      if(result.success){
        toast.success(result.message);
        setLoading(false);
        navigate(`/verify-otp`,{
          state: {
            email : data.email
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  // console.log(data)
  return (
    <>
          <div className='w-[100vw] bg-[#EFF6FF] h-[80vh] flex justify-center'>
            <form action="" onSubmit={submitHandler} className='p-4 flex flex-col gap-0.5 bg-[white] rounded w-[40vw] h-[30vh]  mt-[10vh]'>
                <p className='ml-auto mr-auto'>Foget password</p>
    
              {/* EMAIL */}
              <label htmlFor="" className='ml-[4vw] pt-5'>Email :</label>
              <div className='h-[5vh] w-[80%] ml-auto mr-auto '>
                <input type="text" name='email' className='h-[5vh] w-[100%] pl-2 bg-[#EFF6FF] rounded ' placeholder='Enter your registered email' onChange={changeHandler} value={data.email}/>
              </div>
    
              {/* BUTTON */}
              <div className='h-[5vh] w-[80%] ml-auto mr-auto  '>
                <button className={`w-[100%] h-[5vh] ml-auto mr-auto text-[white] rounded mt-5 ${loading ? "bg-[#abafa8]" : "bg-[#238015]"}` } disabled={loading} >{loading? "Please wait" : "Send Otp"}</button>
                <div className=''>Don't have account? <Link  className="hover:text-[#238015] text-[#15803d]" to={"/register"}>Register</Link></div>
              </div>
            </form>
          </div>
        </>
  )
}

export default ForgotPassword