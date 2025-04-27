import React, { useState, useEffect } from 'react';
import NothingFound from '../components/NothingFound';
import fetchWithAuth from '../utils/fetchAuth';
import EditCategoryModel from '../components/EditCategory.Model';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import UploadSubCategoryModel from '../components/UploadSubCategory.model';
import { fetchSubCategoryData } from '../utils/fetchSubCategoryData';
import ViewImageModel from '../components/ViewImage.model';
import EditSubCategoryModel from '../components/EditSubCategory.Model';
import { fetchCategoryData } from '../utils/fetchCategoryData';

function SubCategory() {
  const [viewImageUrl, setViewImageUrl] = useState()
  const dispatch = useDispatch();
  const [openAddSubCategoryModel, setOpenAddSubCategoryModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [edit_id, setEdit_id] = useState(null);

  //extracting category data from store
  const subCategoryData = useSelector(state => state.subCategory);

  //fetching sub-category data from db and updating inside store
  useEffect(() => {
    setIsLoading(true);
    fetchSubCategoryData(dispatch)
    fetchCategoryData(dispatch)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  //function to handle edit submit
  const editHandler = (_id) => {
    setEdit_id(_id);
    setOpenEditModel(true);
  };

  //function to delete a category from the database
  const deleteHandler = async (_id) => {
    if (!_id) {
      toast.error("Ohh!! Category id required");
      return;
    }
    try {
      const url = `http://localhost:8080/api/sub-category/delete-sub-category`;
      const response = await fetchWithAuth(url, "DELETE", { body: { _id } });

      if (response.error) {
        toast.error(response.message);
      } else if (response.success) {
        toast.success(response.message);
        setOpenAddSubCategoryModel(false);
        fetchSubCategoryData(dispatch);
      }
    } catch (error) {
      toast.error("Something went wrong...!");
    }
  };

  //function to handle view image
  const viewImageHandler = ({url,name})=>{
    setViewImageUrl({url,name});
  }

  return (
    <div className='w-[85vw] min-h-[73vh]'>
      {/* Top Navbar */}
      <nav className='w-[85vw] h-[7vh] shadow flex items-center justify-between p-5'>
        <p className="text-lg font-semibold">Sub Category</p>
        <button
          onClick={() => setOpenAddSubCategoryModel(true)}
          className='border-yellow-300 border-2 rounded p-2 text-gray-600 hover:bg-amber-300 hover:text-black mr-[1vw]'
        >
          Add Sub Category
        </button>
      </nav>

      {/* Add SubCategory Modal */}
      <section>
        <UploadSubCategoryModel 
          openAddSubCategoryModel={openAddSubCategoryModel}
          setOpenAddSubCategoryModel={setOpenAddSubCategoryModel}
        />
      </section>

      {/* Edit SubCategory Modal */}
      <section>
        <EditSubCategoryModel
          openEditModel={openEditModel}
          setOpenEditModel={setOpenEditModel}
          fetchCategory={fetchSubCategoryData}
          edit_id={edit_id}
        />
      </section>

      {/* SubCategory Table Section */}
      <section className='w-full h-[73vh] overflow-auto p-4'>
        {subCategoryData?.length === 0 && !isLoading ? (
          <NothingFound text="No Category" />
        ) : (
          <table className="min-w-full border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b">Sr.No</th>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Image</th>
                <th className="py-3 px-4 border-b">Category</th>
                <th className="py-3 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.values(subCategoryData)?.slice().reverse().map((data, index) => (
                <tr key={data._id} className="hover:bg-gray-50">
                  {/* Sr.No */}
                  <td className="py-3 px-4">{index + 1}</td>

                  {/* Name */}
                  <td className="py-3 px-4">{data.name}</td>

                  {/* Image */}
                  <td className="py-3 px-4">
                    <div className="flex justify-center cursor-pointer" onClick={()=>{viewImageHandler({url:data.image,name:data.name})}}>
                      <img
                        src={data.image}
                        alt="SubCategory"
                        className="h-12 w-12 object-contain rounded"
                      />
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    {Object.values(data?.categoryId).map((category)=>category.name) || "N/A"}
                    </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => editHandler(data._id)}
                      className="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded text-blue-700 cursor-pointer"
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={() => deleteHandler(data._id)}
                      className="px-3 py-1 bg-red-200 hover:bg-red-300 rounded text-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* VIEW SUB-CATEGORY IMAGE SECTION */}
      <section className='flex items-center justify-center'>
        {viewImageUrl ? (<ViewImageModel url={viewImageUrl.url} name={viewImageUrl.name} setCloseModel={setViewImageUrl}/>) : ""}
      </section>
    </div>
  );
}

export default SubCategory;
