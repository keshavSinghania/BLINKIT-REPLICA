import fetchAuth from './fetchAuth.js';
import { updateUserInsideState } from '../store/userSlice.js'; 
const url = import.meta.env.VITE_FETCH_URL + "fetch-user-details";

// Function to fetch user details
const fetchUserDetails = async (dispatch) => {
  try {
    if (!url) {
      return {
        message: "Fetching URL is missing",
        error: true,
        success: false,
      };
    }
    const result = await fetchAuth(url, "GET"); 

    if (result.success) {
      dispatch(updateUserInsideState(result.data));

      return result;
    } else {
      return {
        message: result.message || "Failed to fetch user details",
        error: true,
        success: false,
      };
    }
  } catch (error) {
    console.error("Error in fetchUserDetails:", error);
    return {
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    };
  }
};

export default fetchUserDetails;
