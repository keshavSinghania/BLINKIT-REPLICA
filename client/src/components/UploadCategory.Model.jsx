import React, { useState, useRef, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import { fetchCloudinarySingleImageUrl } from '../utils/fetchCloudinarySingleImageUrl';
import { toast } from 'react-toastify';
import fetchWithAuth from '../utils/fetchAuth';
import LoadingPage from './loadingPage';

function UploadCategoryModel({ openModel, setOpenModel,fetchCategory }) {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Clearing feilds like name imageUrl when model opening
    useEffect(() => {
        if (openModel) {
            setName("");
            setImageUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = null;
        }
    }, [openModel]);

    const onChangeNameHandler = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const onChangeImageHandler = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setIsUploading(true);
        const response = await fetchCloudinarySingleImageUrl(formData);
        setIsUploading(false);

        if (response.success) {
            setImageUrl(response.data.url);
        } else {
            toast.error("Please choose category image again");
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!imageUrl || !name) {
            toast.error("Please fill all the required fields");
            return;
        }

        try {
            const url = `http://localhost:8080/api/category/upload-category`;
            const response = await fetchWithAuth(url, "PUT", { body: { image: imageUrl, name: name } });

            if (response.error) {
                toast.error(response.message);
            } else if (response.success) {
                toast.success(response.message);
                // Clear fields
                setName("");
                setImageUrl(null);
                if (fileInputRef.current) fileInputRef.current.value = null;
                setOpenModel(false);
                fetchCategory()
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <section className={`w-full h-full fixed top-0 right-0 left-0 bg-[#766f6f7e] flex justify-center items-center ${openModel ? "block" : "hidden"}`}>
                <div className='form bg-white w-[50vw] h-[44vh] rounded shadow'>
                    {/* NAV SECTION */}
                    <nav className='w-full h-[15%] flex justify-between items-center p-2'>
                        <p>Category</p>
                        <ImCross onClick={() => setOpenModel(false)} className="cursor-pointer" />
                    </nav>

                    {/* FORM SECTION */}
                    <form className='flex flex-col p-2 gap-2' onSubmit={onSubmitHandler}>
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            value={name}
                            onChange={onChangeNameHandler}
                            className='w-full h-[2vw] bg-[#EDF6FF] p-4 border border-gray-300 rounded'
                            type="text"
                            id="name"
                        />

                        <label htmlFor="image">Image</label>
                        <div className='flex gap-5 items-center'>
                            <div id='image' className='w-[7vw] h-[7vw] bg-[#EDF6FF] rounded border border-gray-300 flex justify-center items-center'>
                                {imageUrl ? <img src={imageUrl} alt="preview" className='object-cover w-full h-full rounded' /> : "No image"}
                            </div>

                            <div className='flex flex-col items-center justify-center gap-2'>
                                <input
                                    ref={fileInputRef}
                                    className="cursor-pointer"
                                    type="file"
                                    id='file'
                                    onChange={onChangeImageHandler}
                                />
                            </div>
                        </div>
                        {imageUrl && (
                                    <button
                                       type="submit"
                                        className={`p-2 mt-2 rounded w-[100%] ${isUploading ? "bg-gray-200 cursor-not-allowed" : "bg-yellow-300 hover:bg-amber-400"}`}
                                        disabled={isUploading}
                                    >
                                        Upload
                                    </button>
                                )}
                    </form>
                </div>

                {isUploading && <LoadingPage message="Fetching image, please wait..." />}
            </section>
        </>
    );
}

export default UploadCategoryModel;
