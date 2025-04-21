import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //for storing data received from to login
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  //handling data change inside the input field
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  // console.log(data);

  //sending data to the database api using fetch
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (!data.email || !data.password) {
      toast.error("Please fill all the required fields");
      setLoading(false);
      return
    }
    try {
      const response = await fetch("http://localhost:8080/api/user/login",
        {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      //if error
      if (result.error) {
        toast.error(result.message);
        setLoading(false);
      }
      if (result.success) {
        toast.success(result.message);
        setLoading(false);
        navigate("/")

      }
      setData({
        email: "",
        password: ""
      })
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }

  }
  return (
    <>
      <div className='w-[100vw] bg-[#EFF6FF] h-[80vh] flex items-center justify-center'>
        <form action="" onSubmit={submitHandler} className='p-4 flex flex-col gap-0.5 bg-[white] rounded w-[40vw] h-[50vh] '>

          {/* EMAIL */}
          <label htmlFor="" className='ml-[4vw] pt-5'>Email</label>
          <div className='h-[5vh] w-[80%] ml-auto mr-auto '>
            <input type="text" name='email' className='h-[5vh] w-[100%] pl-2 bg-[#EFF6FF] rounded ' placeholder='Enter your registered email' value={data.email} onChange={handleChange} />
          </div>

          {/* PASSWORD */}
          <label htmlFor="" className='ml-[4vw] pt-5'>Pasword</label>
          <div className='h-[5vh] w-[80%] ml-auto mr-auto '>
            <input type="password" name='password' className='w-[100%] h-[5vh] pl-2 bg-[#EFF6FF] rounded ' placeholder='Enter your password' value={data.password} onChange={handleChange} />
            <span></span>
            <div className='pt-2'>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>

          {/* BUTTON */}
          <div className='h-[5vh] w-[80%] ml-auto mr-auto mt-10 '>
            <button className={`w-[100%] h-[5vh] ml-auto mr-auto text-[white] rounded mt-5 ${loading ? "bg-[#abafa8]" : " bg-[#15803d] hover:bg-[#238015] "}`} disabled={loading}>
              {
                loading ? "Please Wait loading..." : "Login"
              }
            </button>
            <div className=''>Don't have account? <Link className="hover:text-[#238015] text-[#15803d]" to={"/register"}>Register</Link></div>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage