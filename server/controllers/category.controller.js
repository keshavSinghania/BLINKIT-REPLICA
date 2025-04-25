
import CategoryModel from "../models/category.model.js"

//controller to save new category into database
export const uploadCategory = async(req,res)=>{
    try {
        console.log("inside controller")
        const imageUrl = String(req.body.image);
        const name = String(req.body.name);
        console.log(name);
        console.log(imageUrl)
        if(!imageUrl || !name){
            return res.status(400).json({
                message : "Please provide  all the necessary detailssss",
                error : true,
                success : false
            });
        }

        const payload = {
            name : name,
            image : imageUrl
        };

        const newCategory = new CategoryModel(payload);
        const savedCategory = newCategory.save()
        if(!savedCategory){
            return res.status(500).json({
                message : "Error while saving category into database",
                error : true, 
                success : false
            })
        }

        return res.status(200).json({
            message : "Successfully added new category",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}