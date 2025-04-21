import React, { useEffect, useState } from 'react'
import { IoToday } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const UpdatePassword = () => {

    const location = useLocation();
    const navigate = useNavigate();

    //variable to store data enter by user
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    //checking if user redirected after verified otp or not
    useEffect(() => {
        if (!location?.state?.data?.success) {
            navigate("/");
        } else {
            setData(prev => ({
                ...prev,
                email: location?.state?.email || ""
            }));
        }

    }, [])
    console.log(location);
    console.log(data);

    //function to handle changes inside input box
    const onChangeHandler = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    //function to handle submit 
    const submitHandler = async (e) => {
        e.preventDefault();
        //checking if newPassword is as a confirmPassword or not
        if (!data.newPassword === data.confirmPassword) {
            toast.error("Confirm password must match with new password");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/user/update-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if(!result){
                toast.error("Something went wrong");
            }
            if(result.error){
                toast.error(result.message);
            }
            if(result.success){
                toast.success(result.message);
                navigate("/login");
            }

            console.log(result);
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <>
            <div className='bg-[#EFF6FF] w-[100vw] h-[80vh] flex justify-center p-10'>
                <form onSubmit={submitHandler} className='w-[35%] h-[60%] bg-[#ffffff] rounded shadow flex flex-col items-center gap-2'>

                    {/* HEADING */}
                    <div className='w-[90%] pt-4 pb-2'>
                        <h2 className='text-[20px] font-semibold'>Enter Your Password</h2>
                    </div>
                    {/* NEW PASSWORD INPUT BOX */}
                    <div className='w-[90%] flex flex-col gap-1'>
                        <label htmlFor="">New Password :</label>
                        <input onChange={onChangeHandler} name='newPassword' className='border-[#e3dada] border-2 rounded bg-[#EFF6FF] p-1.5' type="password" />
                    </div>
                    {/* CONFIRM PASSWORD INPUT BOX */}
                    <div className='w-[90%] flex flex-col gap-1'>
                        <label htmlFor="">Confirm Password :</label>
                        <input onChange={onChangeHandler} name='confirmPassword' className='border-[#e3dada] border-2 rounded bg-[#EFF6FF] p-1.5' type="password" />
                    </div>
                    {/* CHANGE PASSWORD BUTTON */}
                    <div className='w-[90%]'>
                        <button className={`w-[100%] h-[5vh] ml-auto mr-auto text-[white] rounded mt-5  bg-[#238015] `} type='submit'>Change Password</button>
                    </div>
                    {/* URL TO BACK TO LOGIN PAGE */}
                    <div className='w-[90%] flex gap-1'>
                        Back to login page?
                        <Link to="/Login" className='text-[#15803d] font-semibold'>Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdatePassword