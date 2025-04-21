import mongoose, { mongo } from "mongoose";

//creating schema for sub categoey

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image : {
        type: String,
        default: ""
    },
    categoryId: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        }
    ],
},{
    timestamps: true
});


//creating model of sub category
const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

export default SubCategoryModel;