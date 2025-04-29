import React, { useEffect, useState } from 'react'
import { IoCloudUploadSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Select from "react-select"
import { fetchCloudinarySingleImageUrl } from '../utils/fetchCloudinarySingleImageUrl';
import { toast } from 'react-toastify';
import LoadingPage from '../components/LoadingPage';
import { useDispatch, useSelector } from 'react-redux';
import fetchWithAuth from '../utils/fetchAuth';
import { fetchCategoryData } from '../utils/fetchCategoryData';
import { fetchSubCategoryData } from '../utils/fetchSubCategoryData.js'
import { ImCross } from "react-icons/im";


function UploadProducts() {
  const categoriesList = useSelector(state => state.category);
  const subCategoriesList = useSelector(state => state.subCategory);
  const [selectedImage, setSelectedImage] = useState([]);
  const [isLoading, setIsloading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState([]);
  const [openAddField, setOpenAddField] = useState(false);
  const [newFieldData, setNewFieldData] = useState([]);
  const [fieldInput, setFieldInput] = useState("")
  // console.log("newfirldname", newFieldData)

  const initialValue = {
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: 0,
    stock: 0,
    price: 0,
    discount: 0,
    description: "",
    more_details: {},
    publish: false
  }
  //state for storing data of product 
  const [data, setData] = useState(initialValue)

  //calling once category and subcategory
  const dispatch = useDispatch()
  useEffect(() => {
    fetchCategoryData(dispatch);
    fetchSubCategoryData(dispatch)
  }, [])
  const optionsCategory = Object.values(categoriesList).map((category) => ({
    value: category._id,
    label: category.name,
  }));
  const optionsSubCategory = Object.values(subCategoriesList).map((category) => ({
    value: category._id,
    label: category.name,
  }));
  //ON CHANGE HANDLER
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  // ADD IMAGE HANDLER
  const addImageHandler = async (e) => {
    const files = Array.from(e.target.files);
    setIsloading(true);

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      );
      setSelectedImage(prev => [...prev, ...uploadedUrls]);
      // toast.success("Successfully selected all the images");
    } catch (error) {
      toast.error("Image upload failed!");
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };
  // console.log(data, "data");
  //USER ADDED FIELD DATA HANDLER ON CHANGE
  const addedFieldChangeHandler = (e) => {
    e.preventDefault();
    setData((prevData) => ({
      ...prevData,
      more_details: {
        ...prevData.more_details,
        [e.target.name]: e.target.value
      }
    }));
  };

  // UPLOAD FUNCTION
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetchCloudinarySingleImageUrl(formData);
    return response.data.url;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const finalData = {
      ...data,
      category: selectedCategoryId.map((item) => item.value),
      subCategory: selectedSubCategoryId.map((item) => item.value),

      image: selectedImage,
    };
    // console.log(finalData,"final")
    setData(finalData);
    // console.log(data,"fianfufu")
    setIsloading(true)
    //updating data inside database
    uploadProductInDb()

  };

  //function to set data pf product inside database
  const uploadProductInDb = async () => {
    try {
      const url = `${import.meta.env.VITE_FETCH_BASE_URL}product/upload-product`;
      const response = await fetchWithAuth(url, "POST", { body: data});

      if (response.error) {
        toast.error(response.message);
        setIsloading(false)
      } else if (response.success) {
        toast.success(response.message);
        setIsloading(false)
        // Clear field
        setData(initialValue);
        setNewFieldData([]);
        setFieldInput("")
        setSelectedCategoryId([]);
        setSelectedSubCategoryId([]);
        setSelectedImage([]);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setIsloading(false)
    }
  };
  return (
    <>
      <main className='w-[85vw] min-h-[73vh]'>
        {/* HEADER SECTION */}
        <section>
          <nav className='h-[7vh] flex shadow p-2'>
            <p>Upload Product</p>
          </nav>
        </section>

        {/* FORM SECTION */}
        <section className=' flex shadow p-2' >
          <form action="" className='flex flex-col gap-0'>

            {/* Name */}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1 w-[calc(100vw-20vw)]'>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name='name'
                value={data.name}
                placeholder='Enter product name'
                onChange={onChangeHandler}
                className='bg-[#EDF6FF] p-3 h-[3vw] border-1 border-[#cacaca] rounded  text-[#434141]'
              />
            </div>

            {/* Description */}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1 w-[calc(100vw-20vw)] '>
              <label htmlFor="description">Description</label>
              <input
                name='description'
                type="text"
                value={data.description}
                id="description"
                placeholder='Enter product description'
                onChange={onChangeHandler}
                className='bg-[#EDF6FF] p-3 h-[6vw] border-1 border-[#cacaca] rounded text-[#434141]'
              />
            </div>
            {/* Image upload */}
            <div className='flex flex-col ml-3 mr-3 mb-1 w-[calc(100vw-20vw)] gap-1'>
              <label htmlFor="image">Image</label>

              <label
                htmlFor="imageInput"
                className='bg-[#EDF6FF] p-3 h-[6vw] border-1 border-[#cacaca] rounded text-[#434141] flex items-center justify-center flex-col cursor-pointer'
              >
                <IoCloudUploadSharp size={30} />
                <p>Upload image</p>
              </label>

              <input
                id="imageInput"
                type="file"
                accept="image/*"
                multiple
                onChange={addImageHandler}
                className="hidden"
              />
            </div>

            {/* image display*/}
            <div className='flex flex-col ml-3 mr-3 mb-1 w-[calc(100vw-20vw)] gap-1  '>
              <div className='bg-[#EDF6FF] rounded text-[#434141] flex items-center flex-wrap w-[80vw]'>
                <div className='flex flex-wrap gap-3 m-2'>
                  {/* SELECTED IMAGES */}
                  {selectedImage?.map((url, index) => (
                    <div id={index} key={index}>
                      <div className='w-[8vw] h-[8vw] border-1 object-contain relative group hover:scale-[1.05]'>
                        <div className='absolute right-0 p-1'>
                          <MdDelete
                            onClick={() => {
                              setSelectedImage((prev) => prev.filter((_, i) => i !== index));
                            }}
                            size={18}
                            className=' hidden group-hover:block' />
                        </div>
                        <img className="w-full h-full object-cover p-1" src={url} alt="" />
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* CATEGORY SELECT */}
            <div className='flex flex-col ml-3 mr-3 mb-1 w-[calc(100vw-20vw)] gap-1 '>
              <label htmlFor="category">Select Category</label>
              <Select
                id="category"
                options={optionsCategory}
                value={selectedCategoryId}
                onChange={(selectedOptions) => { setSelectedCategoryId(selectedOptions || []) }}
                isMulti
                placeholder="Select Categories"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: '#EDF6FF',
                    height: "3vw",
                  }),
                }}
              />
            </div>

            {/* SUB-CATEGORY SELECT */}
            <div className='flex flex-col ml-3 mr-3 mb-1 w-[calc(100vw-20vw)] gap-1'>
              <label htmlFor="sub-category">Select Sub-Category</label>
              <Select
                id="sub-category"
                options={optionsSubCategory}
                value={selectedSubCategoryId}
                onChange={(selectedOptions) => setSelectedSubCategoryId(selectedOptions || [])}
                isMulti
                placeholder="Select Sub-Categories"
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: '#EDF6FF',
                    height: "3vw",
                  }),
                }}
              />
            </div>

            {/* UNIT */}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1'>
              <label htmlFor="name">Unit</label>
              <input
                type="number"
                id="unit"
                name='unit'
                value={data.unit}
                placeholder='Enter product unit'
                onChange={onChangeHandler}
                className='bg-[#EDF6FF] p-3 h-[3vw] border-1 border-[#cacaca] rounded text-[#434141]'
              />
            </div>
            {/* STOCK*/}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1'>
              <label htmlFor="stock">Number of stock</label>
              <input
                type="number"
                value={data.stock}
                id="stock"
                name='stock'
                placeholder='Enter product stock '
                onChange={onChangeHandler}
                className='bg-[#EDF6FF] p-3 h-[3vw] border-1 border-[#cacaca] rounded text-[#434141]'
              />
            </div>
            {/* PRICE*/}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1'>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                value={data.price}
                id="price"
                name='price'
                placeholder='Enter product price '
                onChange={onChangeHandler}
                className='bg-[#EDF6FF] p-3 h-[3vw] border-1 border-[#cacaca] rounded text-[#434141]'
              />
            </div>
            {/* DISCOUNT*/}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1 '>
              <label htmlFor="discount">Discount</label>
              <input
                name='discount'
                value={data.discount}
                type="number"
                id="discount"
                placeholder='Enter product discount '
                onChange={onChangeHandler}
                className='bg-[#EDF6FF] p-3 h-[3vw] border-1 border-[#cacaca] rounded text-[#434141]'
              />
            </div>
            {/* ADD FIELD BY USER*/}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1'>
              {/* <label htmlFor="discription">Add Fields</label> */}
              <button
                id="add-field"
                onClick={() => setOpenAddField(true)}
                className=' bg-[white] p-3 m-2 ml-0 h-[2vw] w-[8%] text-black flex items-center justify-center border-1 rounded border-amber-400 hover:bg-amber-400 hover:border-none'
              >
                Add Field
              </button>
            </div>
            {
              openAddField ?
                (<div className='fixed top-0 left-0 bg-[#c5c1c173] bg-opacity-50 z-50 flex justify-center items-center w-[100vw] h-[100vh] inset-0 overflow-hidden overflow-y-hidden'>
                  <div className=' relative flex flex-col bg-white border w-[25vw] h-[10vw] rounded p-2 m-2 gap-3'>
                    <div className='absolute right-0 m-1 cursor-pointer ' onClick={() => setOpenAddField(false)}>
                      <ImCross />
                    </div>
                    <label htmlFor="add-field">Add Field</label>
                    <input type="text" required placeholder='key-features' onChange={(e) => setFieldInput(e.target.value)} value={fieldInput} className='border h-[2vw] rounded p-2' />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (fieldInput === "") {
                          return toast.error("cannot be empty")
                        }
                        setNewFieldData(prev => [...prev, fieldInput])
                        setFieldInput("");
                        setOpenAddField(false)
                      }
                      }
                      className='text-black bg-yellow-400 rounded w-[25%] h-[2vw] m-auto p-1 text-center'>
                      Add Field
                    </button>
                  </div>
                </div>)
                :
                ""
            }
            {/* DISPLAYING NEW FIELDS ADDED BY USER */}
            {
              newFieldData.map((value,index) => (
              <div className='flex flex-col ml-3 mr-3 mb-1 gap-1 ' key={index}>
                <label htmlFor="discount">{value}</label>
                <input
                  name={value}
                  type="text"
                  id={value}
                  placeholder={`Enter product ${value}`}
                  onChange={addedFieldChangeHandler}
                  className='bg-[#EDF6FF] p-3 h-[3vw] border-1 border-[#cacaca] rounded text-[#434141]'
                />
              </div>))
            }
            {/* SUBMIT BUTTON */}
            <div className='flex flex-col ml-3 mr-3 mb-1 gap-1'>
              <button
                type="submit"
                className={`p-2 mt-4 rounded w-full ${isLoading ? "bg-gray-200 cursor-not-allowed" : "bg-yellow-300 hover:bg-amber-400"}`}
                disabled={isLoading}
                onClick={onSubmitHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </section>
        {/* LOADING */}
        <section>
          {isLoading ? (<LoadingPage message="Please wait......" />) : ""}
        </section>
      </main>
    </>
  )
}

export default UploadProducts