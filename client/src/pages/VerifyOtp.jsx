import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifyOtp() {
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false);
    const [data, setData] = useState(Array(6).fill(""));
    const location = useLocation();
    const email = location.state?.email;

    //if email not exists inside loaction.state that mean someone trying to access this page directly so ...
    useEffect(()=>{
      if(!email){
        navigate("/")
      }
    },[])

    //function for change handler
    const changeHandler = (e) => {
    const index = Number(e.target.name);
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // only allow single digit numeric
    const newData = [...data];
    newData[index] = value;
    setData(newData);
    if (index < 5 && value !== "") {
      document.getElementById(`myId${index + 1}`)?.focus();
    }
  };

  //function to give perfect functionality to the input otp box
  const handleKeyDown = (e) => {
    const index = Number(e.target.name);
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      document.getElementById(`myId${index - 1}`)?.focus();
    }
  };

  //handling submit sending data to the database
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(data.some(val=> val==="")){
        toast.error("OTP must be of 6 digits")
        return
    }
    const otp = data.join("")
    try {
        const response = await fetch("http://localhost:8080/api/user/verify-otp",{
        method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                otp:otp
            })
      });
      const result = await response.json();
      // console.log(result)
      if(result.error){
        toast.error(result.message)
      }
      if(result.success){
        toast.success(result.message);
        navigate("/update-password",{
          state:{
            data: result,
            email:email,
          }
        })
      }
    } catch (error) {
        toast.error("Something wrong went")
    }
  }
  return (
    <>
      <div className='w-[100vw] bg-[#EFF6FF] h-[80vh] flex justify-center'>
        <form className='p-4 flex flex-col gap-0.5 bg-white rounded w-[40vw] h-[30vh] mt-[10vh]' onSubmit={handleSubmit}>
          <p className='ml-auto mr-auto'>An OTP has been sent to your Gmail.</p>

          {/* OTP Inputs */}
          <div className='h-[5vh] w-[80%] ml-auto mr-auto pt-5'>
            <div className='flex gap-2 justify-center items-center'>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`myId${index}`}
                  type="text"
                  inputMode="numeric"
                  name={index}
                  value={data[index]}
                  onChange={changeHandler}
                  onKeyDown={handleKeyDown}
                  maxLength={1}
                  className="h-[5vh] w-[5vh] pl-2 bg-[#EFF6FF] rounded border text-center"
                />
              ))}
            </div>
          </div>

          {/* Button */}
          <div className='h-[5vh] w-[80%] ml-auto mr-auto mt-2'>
            <button
              type="submit"
              className='w-full h-[5vh] text-white rounded mt-5 bg-[#15803d] hover:bg-[#238015]'
            >
              Send Otp
            </button>
            <div className='text-center mt-2'>
              Don't have an account?{" "}
              <Link to="/register" className="hover:text-[#238015] text-[#15803d]">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default VerifyOtp;
