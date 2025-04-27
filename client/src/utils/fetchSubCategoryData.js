
import { setSubCategoryDataInsideStore } from "../store/subCategorySlice";
import fetchWithAuth from "./fetchAuth"

//function to fetch data from database of all the category and also store it inside store
export const fetchSubCategoryData = async (dispatch) => {
    const url = `${import.meta.env.VITE_FETCH_BASE_URL}sub-category/get-sub-category`;
    const response = await fetchWithAuth(url, "GET",);
    console.log("ii got data from db", response.data)
    dispatch(setSubCategoryDataInsideStore(response.data));
    return response.data;
  };