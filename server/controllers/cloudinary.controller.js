import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

 export const uploadCloudinarySingleImage =async (req, res) => {
    try {

        //receives using multer 
        const image = req.file;
        const result = await uploadImageCloudinary(image);
        if(!result){
            return res.status(400).json({
                message : "Error while uploading to the cloudinary",
                error : true,
                success :false
            })
        }

        return res.status(201).json({
            message : "SUCCESSFULLY GET URL FROM CLOUDINARY",
            error : false,
            success : true,
            data:{
                url: result.url
            }
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true, 
            success : false
        })
    }
}