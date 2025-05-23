import { v2 as cloudinary } from 'cloudinary';
// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadImageCloudinary = async (image)=>{
    //converting image in buffer
    const buffer = image.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder : "Blinkit"},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })
    return uploadImage;
}

export default uploadImageCloudinary