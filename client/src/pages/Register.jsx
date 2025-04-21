import React, { act, useState } from 'react'
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';  

function Register() {
const [loading, setLoading] = useState(false);
const navigate = useNavigate()
//to store data entered by user
const [data,setData] = useState({
  name : "",
  email : "",
  password : "",
  confirmPassword : ""
})

//change handler
const changeHandler = (e)=>{
  setData({
    ...data,
    [e.target.name]:e.target.value
  })
};

//submit handler
const submitHandler = async (e)=>{
  if(loading){
    return
  }
  setLoading(true);
  e.preventDefault();
  //to verify empty input
  if(!data.email || !data.password || !data.confirmPassword || !data.name){
    toast.error("Please fill all the detials");
    setLoading(false);
    return
  }

  //checking password is same as confirmpassword or not
  if(data.password !== data.confirmPassword) {
    toast.error("Password must same as confirm password");
    setLoading(false);
    return
  }
  try {
    const response = await fetch("http://localhost:8080/api/user/register",{
      method:"post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const result = await response.json()
    setData({ name : "",
      email : "",
      password : "",
      confirmPassword : ""
    })

    //if(success)
    if(result.success){
      toast.success(result.message);
      setLoading(false);
      navigate("/login")
    }

    //if(error)
    if(result.error){
      toast.error(result.message);
      setLoading(false);
    }
    console.log(result)
  } catch (error) {
    toast.error("Something went wrong");
    setLoading(false);
  }
}

console.log(loading)
  return (
    <>
    <div className='bg-[#EFF6FF] min-h-[80vh] flex items-center justify-center'>
        <form action="" onSubmit={submitHandler}>
        <div className='flex flex-col gap-2 min-w-[40vw] bg-[white] min-h-[70vh] '>
            <p className='ml-[4vw] pt-5 pb-5'>Welcome to blinkit</p>
            {/* NAME */}
            <label className='ml-[4vw]' htmlFor="name">Name :</label>
            <input name="name" className="bg-[#EFF6FF] w-[80%] ml-auto mr-auto h-[5vh] pl-3 border-1 border-gray-200 rounded-sm " placeholder='Enter your name' type="text" value={data.name} onChange={changeHandler} />
            {/* EMAIL */}
            <label className='ml-[4vw]' htmlFor="email">Email :</label>
            <input name='email' className="bg-[#EFF6FF] w-[80%] ml-auto mr-auto h-[5vh] pl-3 border-1 border-gray-200 rounded-sm " placeholder='Enter your email' type="email" value={data.email} onChange={changeHandler}  />
            {/* PASSWORD */}
            <label className='ml-[4vw]' htmlFor="password">Password :</label>
            <input name='password' className="bg-[#EFF6FF] w-[80%] ml-auto mr-auto h-[5vh] pl-3 border-1 border-gray-200 rounded-sm " placeholder='Enter your password' type="password" value={data.password} onChange={changeHandler} />
            {/* CONFIRM PASSWORD */}
            <label className='ml-[4vw]' htmlFor="password">Confirm Password :</label>
            <input name='confirmPassword' className="bg-[#EFF6FF] w-[80%] ml-auto mr-auto h-[5vh] pl-3 border-1 border-gray-200 rounded-sm " placeholder='Enter your confirm password' type="password" value={data.confirmPassword} onChange={changeHandler} />
            {/* BUTTON */}
            <button className={`w-[80%] h-[5vh] ml-auto mr-auto text-[white] rounded mt-5 ${loading ? "bg-[#abafa8]" : " bg-[#15803d] hover:bg-[#238015] "}`} disabled={loading}>
              {
                loading ? "Please wait for a while" : "Register"
              }
            </button>
            <div className='ml-[4vw]'>Already have account? <Link to={"/login"}  className="hover:text-[#238015] text-[#15803d]">Login</Link></div>
        </div>
        </form>
    </div>
    </>
  )
}

export default Register