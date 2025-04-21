import mongoose from "mongoose";

//creating schema for category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        default : ""
    },
    image :{
        type:  String, 
        default : ""
    }
}, {
    timestamps: true
});

//creating model for category
const CategoryModel = mongoose.model("Category",categorySchema);

export default CategoryModel;