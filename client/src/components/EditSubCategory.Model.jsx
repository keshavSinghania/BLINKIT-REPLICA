import React, { useState, useRef, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import { toast } from 'react-toastify';
import { fetchCloudinarySingleImageUrl } from '../utils/fetchCloudinarySingleImageUrl';
import fetchWithAuth from '../utils/fetchAuth';
import LoadingPage from './loadingPage';
import { fetchCategoryData } from '../utils/fetchCategoryData';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchSubCategoryData } from '../utils/fetchSubCategoryData';

const EditSubCategoryModel = ({ openEditModel, setOpenEditModel, edit_id }) => {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState([]);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const subCategoryData = useSelector(state => state.subCategory);
    const categoriesList = useSelector(state => state.category);

    // Created options for select input
    const options = Object.values(categoriesList).map((category) => ({
        value: category._id,
        label: category.name,
    }));

    // Fetch subcategory data for editing
    const fetchEditSubCategoryData = async () => {
        const editSubCategoryData = subCategoryData.find((data) => data._id === edit_id);
        if (!editSubCategoryData) return;

        setName(editSubCategoryData?.name || "");
        setImageUrl(editSubCategoryData?.image || null);
        const tempSelectedCategories = editSubCategoryData?.categoryId?.map((category) => ({
            value: category._id,
            label: category.name
        })) || [];

        setSelectedCategoryId(tempSelectedCategories);
    };

    useEffect(() => {
        if (openEditModel) {
            fetchEditSubCategoryData();
            if (fileInputRef.current) fileInputRef.current.value = null;
        }
    }, [openEditModel, edit_id]);

    const onChangeNameHandler = (e) => {
        setName(e.target.value);
    };

    const onChangeImageHandler = async (e) => {
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

    //submit handler
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!imageUrl || !name || selectedCategoryId.length === 0) {
            toast.error("Please fill all the required fields");
            return;
        }

        const categoryIds = selectedCategoryId.map((category) => category.value);

        try {
            const url = `http://localhost:8080/api/sub-category/edit-sub-category`;
            const response = await fetchWithAuth(url, "PUT", {
                body: {
                    _id: edit_id,
                    image: imageUrl,
                    name: name,
                    categoryId: categoryIds
                }
            });

            if (response.error) {
                toast.error(response.message);
            } else if (response.success) {
                toast.success(response.message);
                setName("");
                setImageUrl(null);
                setSelectedCategoryId([]);
                fetchSubCategoryData(dispatch);
                if (fileInputRef.current) fileInputRef.current.value = null;
                setOpenEditModel(false);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <section className={`w-full h-full fixed top-0 right-0 left-0 bg-[#766f6f7e] flex justify-center items-center ${openEditModel ? "block" : "hidden"}`}>
                <div className='form bg-white w-[50vw] min-h-[50vh] rounded shadow'>
                    {/* NAV SECTION */}
                    <nav className='w-full h-[15%] flex justify-between items-center p-2'>
                        <p>Edit Sub Category</p>
                        <ImCross onClick={() => setOpenEditModel(false)} className="cursor-pointer" />
                    </nav>

                    {/* FORM SECTION */}
                    <form className='flex flex-col p-2 gap-2' onSubmit={onSubmitHandler}>
                        {/* NAME */}
                        <label htmlFor="name">Sub Category Name</label>
                        <input
                            name="name"
                            value={name}
                            onChange={onChangeNameHandler}
                            className='w-full h-[2vw] bg-[#EDF6FF] p-4 border border-gray-300 rounded'
                            type="text"
                            id="name"
                        />

                        {/* CATEGORY SELECT */}
                        <label htmlFor="category">Select Category</label>
                        <Select
                            id="category"
                            options={options}
                            value={selectedCategoryId}
                            onChange={(selectedOptions) => setSelectedCategoryId(selectedOptions || [])}
                            isMulti
                            placeholder="Select Categories"
                        />

                        {/* IMAGE */}
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

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            className={`p-2 mt-4 rounded w-full ${isUploading ? "bg-gray-200 cursor-not-allowed" : "bg-yellow-300 hover:bg-amber-400"}`}
                            disabled={isUploading}
                        >
                            Edit Sub Category
                        </button>
                    </form>
                </div>

                {isUploading && <LoadingPage message="Fetching image, please wait..." />}
            </section>
        </>
    );
};

export default EditSubCategoryModel;
