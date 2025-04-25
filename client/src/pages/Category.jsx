import React, { useState, useEffect } from 'react';
import UploadCategoryModel from '../components/UploadCategory.model';
import NothingFound from '../components/NothingFound';
import fetchWithAuth from '../utils/fetchAuth';
import EditCategoryModel from '../components/EditCategory.Model';
import { toast } from 'react-toastify';

function Category() {
  const [openModel, setOpenModel] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [edit_id, setEdit_id] = useState(null)
  
  
  //function to fetch data from database all the category
  const fetchCategory = async () => {
    const url = `${import.meta.env.VITE_FETCH_BASE_URL}category/get-category`;
    console.log(url);
    const response = await fetchWithAuth(url, "GET",);
    console.log(response);
    setCategoryList(response.data)
    return response.data;
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  //function to handlle edit submit
  const editHandler = (_id) => {
    setEdit_id(_id)
    setOpenEditModel(true);
  };
  
//function to delete a category from database
const deleteHandler = async(_id)=>{
  if(!_id){
    toast.error("Ohh!! Category id required");
    return
  }
  try {
    console.log(_id,"check")
    const url = `http://localhost:8080/api/category/delete-category`;
    const response = await fetchWithAuth(url, "DELETE", { body: { _id:_id } });

    if (response.error) {
      console.log(response)
      toast.error(response.message);
    } else if (response.success) {
        toast.success(response.message);
        // Clear fields
        setOpenModel(false);
        fetchCategory()
    }
} catch (error) {
    toast.error("Something went wrong...!");
}
}
  return (
    <>
      <div className='w-[85vw] min-h-[73vh]'>
        <nav className='w-[85vw] h-[7vh] shadow flex items-center justify-between p-5 '>
          <p>Category</p>
          <button onClick={() => setOpenModel(true)} className='border-yellow-300 border-2 rounded p-2 text-gray-600 hover:bg-amber-300 hover:text-black mr-[1vw]'>
            Add Category
          </button>
        </nav>

        {/* ADD CATEGORY MODEL */}
        <section>
          <UploadCategoryModel openModel={openModel} setOpenModel={setOpenModel} fetchCategory={fetchCategory} />
        </section>
        {/* EDIT CATEGORY MODEL */}
        <section>
          <EditCategoryModel openEditModel={openEditModel} setOpenEditModel={setOpenEditModel} fetchCategory={fetchCategory} edit_id={edit_id}/>
        </section>

        {/* ALL CATEGORY DISPLAY PAGE */}
        <section className='w-full h-[73vh] overflow-y-auto'>
          <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 p-4'>
            {categoryList?.map((data, index) => (
              <div
                key={index}
                className='rounded hover:scale-[1.05] flex-col overflow-hidden flex w-[13vw] justify-center items-center min-h-[22vw] bg-white shadow-lg'
              >
                {/* image div */}
                <div className='min-w-[10%] min-h-[80%] p-4 ml-2 mt-2 mr-2  bg-[#EDF6FF] rounded-xl'>
                  <img src={data.image} alt={`Category ${index}`} className='h-full object-contain' />
                </div>

                {/* category name */}
                <p className='p-1 '>{data.name}</p>

                {/* edit and delete button */}
                <div className='pb-2 gap-2 w-[100%] flex items-center justify-center'>
                  <button className='w-[30%] border bg-red-200 rounded hover:bg-red-400' onClick={()=>{editHandler(data._id)}}>Edit</button>
                  <button className='w-[30%] border bg-green-200 rounded hover:bg-green-400' onClick={()=>{deleteHandler(data._id)}}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {categoryList?.length === 0 && !isLoading && (
            <NothingFound text="No Category" />
          )}
        </section>

      </div>
    </>
  );
}

export default Category;
