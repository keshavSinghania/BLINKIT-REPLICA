import { toast } from "react-toastify";
import fetchWithAuth from "./fetchAuth";

export const fetchCloudinarySingleImageUrl = async(formData)=>{
    try {
        const url = `http://localhost:8080/api/cloud/upload-cloudinary-single-image`
        const response = await fetchWithAuth(url, "POST", { body: formData, isFormData: true });
        // console.log(response);
        if (response.error) {
          toast.error(response.message);
        };
        if(response.success){
            return response;
        }
    } catch (error) {
        return error
    }
}