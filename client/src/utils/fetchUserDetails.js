import fetchAuth from './fetchAuth.js';

const url = import.meta.env.VITE_FETCH_URL+"fetch-user-details";
// console.log(url)
const fetchUserDetails = async () => {
  try {
    if (!url) {
      return {
        message: "Fetching URL is missing",
        error: true,
        success: false
      };
    }

    const response = await fetchAuth(url,"GET");
    const result = response || response.json();
    // console.log(result);
    return result; 
  } catch (error) {
    console.error("Error in fetchUserDetails:", error);
    return {
      message: error.message || "Something went wrong",
      error: true,
      success: false
    };
  }
};

export default fetchUserDetails