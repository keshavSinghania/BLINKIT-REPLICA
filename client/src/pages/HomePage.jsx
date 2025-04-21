import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchUserDetails from '../utils/fetchUserDetails';
import { updateUserInsideState } from '../store/userSlice';

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
    <div>
      <ul>
        {Object.keys(userData).map((key, index) => (
          <li key={index}>
            {key}: {userData[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
