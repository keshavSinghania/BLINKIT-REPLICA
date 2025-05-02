import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchUserDetails from '../utils/fetchUserDetails';
import { updateUserInsideState } from '../store/userSlice';
import banner from "../assets/banner.jpg"
import mobileBanner from "../assets/banner-mobile.jpg"

function HomePage() {
  const dispatch = useDispatch();

  //  Local state to store data fetched directly from DB
  const [userDetails, setUserDetails] = useState(null);

  //  Redux store data
  const userData = useSelector((state) => state.user);

  const handleFetchUserDetails = async () => {
    const fetchedData = await fetchUserDetails();
    dispatch(updateUserInsideState(fetchedData.data));
    setUserDetails(fetchedData);
  }

  useEffect(() => {
    handleFetchUserDetails();
  }, []);

  // console.log(userData, "store data");
  // console.log(userDetails, "db data");

  return (
    <>
    {/* BANNER SECTION */}
    <section className=' flex items-center justify-center'>
      <div className={`flex rounded w-[98vw] min-h-[30vh] bg-blue-100 mt-2 ${!banner && "animate-pulse"}`}>
        <img src={banner} alt="" className='lg:block hidden' />
        <img src={mobileBanner} alt="" className='lg:hidden' />
      </div>
    </section>
    </>
  );
}

export default HomePage;
