import fetchWithAuth from "./fetchAuth"
const url = import.meta.env.VITE_FETCH_URL+"update-user";
export const updateUserDetailInDb = async(newData)=>{
    try {
        const response = await fetchWithAuth(url,"PUT",{body:newData});
        const result = response || response.result;
        return result;
    } catch (error) {
        console.error("Error in updatingUserDataInsideDB:", error);
    return {
      message: error.message || "Something went wrong",
      error: true,
      success: false
    };
    }
}