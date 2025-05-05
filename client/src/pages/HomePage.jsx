import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import banner from "../assets/banner.jpg"
import mobileBanner from "../assets/banner-mobile.jpg"
import { fetchCategoryData } from '../utils/fetchCategoryData.js'
import ProductByCategoryId from '../components/ProductByCategoryId.jsx'
import { fetchSubCategoryData } from '../utils/fetchSubCategoryData.js'
import { useNavigate } from 'react-router-dom'
import fetchUserDetails from '../utils/fetchUserDetails.js'

function HomePage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const navigate = useNavigate()


  //function to fetch data of all the category and store inside state
  const fetchCategoryDataHandler = async () => {
    setIsLoading(true)
    const data = await fetchCategoryData(dispatch);
    setIsLoading(false)
    console.log("checkCat", data)
    setCategoryData(data);
  }

  //fetching sub-category data from db and updating inside store
  useEffect(() => {
    setIsLoading(true);
    // fetchUserDetails(dispatch);
    fetchSubCategoryData(dispatch)
    fetchCategoryData(dispatch)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    fetchCategoryDataHandler();
    fetchUserDetails(dispatch);
  }, [])

  return (
    <>
      {/* BANNER SECTION */}
      <section className=' flex items-center justify-center'>
        <div className={`flex rounded min-w-[98vw] min-h-[30vh] bg-blue-100 mt-2 ${!banner && "animate-pulse"}`}>
          <img src={banner} alt="" className='lg:block hidden' />
          <img src={mobileBanner} alt="" className='lg:hidden ' />
        </div>
      </section>

      {/* CATEGORY DISPLAY */}
      <section className="py-6 px-4 bg-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {isLoading ? (
            new Array(30).fill(null).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow hover:shadow-md transition-all p-4 flex flex-col items-center justify-between gap-2 animate-pulse">
                <div className="w-full aspect-[4/3] bg-blue-100 rounded-md"></div>
                <div className="w-full h-4 bg-blue-200 rounded-md"></div>
              </div>
            ))
          ) : (
            categoryData?.map((category, index) => (
              <div onClick={() => navigate(`/category/${encodeURIComponent(category?.name)}/${category?._id}`)}
                key={index} className="bg-white rounded-xl shadow hover:shadow-md transition-all p-4 flex flex-col items-center justify-between gap-2">
                <div className="w-full aspect-[4/3] bg-blue-100 rounded-md"><img src={category?.image} alt={category?.name} /></div>
                <div className="w-full h-8 text-center rounded-md">{category?.name}</div>
              </div>
            ))
          )}

        </div>
      </section>

      {/* CATEGORY NAME WITH ITS 15 PRODUCTS */}
      <section>
        {
          categoryData.map((cat, index) => (
            <ProductByCategoryId _id={cat._id} name={cat.name} key={index} />
          ))
        }
      </section>
    </>
  );
}

export default HomePage;
