import { setCategoryDataInsideStore } from "../store/categorySlice";
import fetchWithAuth from "./fetchAuth"

//function to fetch data from database of all the category and also store it inside store
export const fetchCategoryData = async (dispatch) => {
    const url = `${import.meta.env.VITE_FETCH_BASE_URL}category/get-category`;
    const response = await fetchWithAuth(url, "GET",);
    console.log("ii got data from db", response.data)
    dispatch(setCategoryDataInsideStore(response.data));
    return response.data;
  };