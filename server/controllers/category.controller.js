
import CategoryModel from "../models/category.model.js"
import UserModel from "../models/user.model.js";

//controller to save new category into database
export const uploadCategory = async (req, res) => {
    try {
        //from auth middleware
        const userId = req.userId;
        //checking user is admin or not
        const userData = await UserModel.findById(userId);
        if(userData.role !== "ADMIN"){
            return res.status(400).json({
                message : "Admin access is required to make these changes",
                error : true,
                success : false
            })
        }
        const imageUrl = String(req.body.image);
        const name = String(req.body.name);
        if (!imageUrl || !name) {
            return res.status(400).json({
                message: "Please provide  all the necessary detailssss",
                error: true,
                success: false
            });
        }

        const payload = {
            name: name,
            image: imageUrl
        };

        const newCategory = new CategoryModel(payload);
        const savedCategory = newCategory.save()
        if (!savedCategory) {
            return res.status(500).json({
                message: "Error while saving category into database",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "Successfully added new category",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//controller to get catogory data from databse
export const getCategory = async (req, res) => {
    try {
        const data = await CategoryModel.find();
        if (!data) {
            return res.status(400).json({
                message: "Problem while fetching category data from database",
                error: true,
                success: false
            })
        }
        else {
            return res.status(200).json({
                message: "Successfully fetched category data",
                error: false,
                success: true,
                data: data
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//controller to edit category data from database
export const editCategory = async (req, res) => {
    try {
        const { _id, name, image } = req.body;
        //from auth middleware
        const userId = req.userId;
        //checking user is admin or not
        const userData = await UserModel.findById(userId);
        if(userData.role !== "ADMIN"){
            return res.status(400).json({
                message : "Admin access is required to make these changes",
                error : true,
                success : false
            })
        }
        if (!_id || !name || !image) {
            return res.status(400).json({
                message: "Something went wrong while editing your category",
                error: true,
                success: false
            })
        }
        //find by id and updating
        const updatedCategory = await CategoryModel.findByIdAndUpdate(_id, { name: name, image: image });
        if (!updatedCategory) {
            return res.status(400).json({
                message: "Error while updating data inside db",
                error: true,
                success: false
            })
        }
        return res.status(200).json({
            message: "Successfully updated the category",
            error: false,
            success: true,
            data: updatedCategory
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//controller to delete catefory from database
export const deleteCategory = async(req,res)=>{
    try {
        //from auth middleware
        const userId = req.userId;
        //checking user is admin or not
        const userData = await UserModel.findById(userId);
        if(userData.role !== "ADMIN"){
            return res.status(400).json({
                message : "Admin access is required to make these changes",
                error : true,
                success : false
            })
        }
        const {_id} = req.body;
        console.log(_id)
        if(!_id){
            return res.status(400).json({
                message : "Id required to delete",
                error : true,
                success: false
            })
        };

        const deletedCategory = await CategoryModel.findByIdAndDelete({_id:_id});
        if(!deletedCategory){
            return res.status(400).json({
                message : "error while deleting category inside db",
                error : true,
                success: false
            })
        }
        return res.status(200).json({
            message : "Category successfully deleted ",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error: true,
            success : false
        })
    }
}