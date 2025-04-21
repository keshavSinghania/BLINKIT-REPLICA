import React, { useState } from 'react'
import { ImCross } from "react-icons/im";

function UploadCategoryModel({ openModel, setOpenModel }) {
    const [data, setData] = useState({name: "",image: ""});
    //function to handle onChange
    const onChangeHandler = (e)=>{
        e.preventDefault();
        setData({
            ...data,
            [e.target.name] : e.target.value,
        })
    };
    // console.log(data,"data")
    return (
        <>
            <section className={`w-[100%] h-[100%] rounded shadow fixed top-0 right-0 left-0 bg-[#766f6f7e] flex justify-center items-center ${openModel ? "block" : "hidden"}`}>
                <div className='form bg-white w-[50vw] h-[40vh] rounded shadow'>
                    {/* NAV SECTION */}
                    <nav className='w-[100%] h-[15%] flex justify-between items-center p-2'>
                        <p>Category</p>
                        <ImCross onClick={() => setOpenModel(false)}></ImCross>
                    </nav>
                    {/* FORM SECTION */}
                    <form action="" className='flex flex-col p-2 gap-2'>
                        <label htmlFor="name">Name</label>
                        <input name="name" onChange={onChangeHandler} className='w-[100%] h-[2vw] bg-[#EDF6FF] p-4 border-1 border-gray-300 rounded' type="text" id="name" />
                        <label htmlFor="image">Image</label>
                        <div className='flex gap-5  items-center'>
                            <div id='image' className='w-[7vw] h-[7vw] bg-[#EDF6FF] rounded border-1 border-gray-300 flex justify-center items-center'>{data.image ? data.image.name : "No Image"}</div>
                            <label htmlFor="file">
                                <button id='file' className={`${data.name ? "bg-amber-300 text-black" : "bg-gray-300"} h-[100%] p-2 rounded `} disabled={!data.name}>Upload Image</button>
                            </label>
                            <input type="file" id='file' hidden  onChange={onChangeHandler}/>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default UploadCategoryModel