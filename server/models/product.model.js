import mongoose, { disconnect } from "mongoose";

//creating product schema
const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Product name must provide"]
    },
    image : {
        type: Array,
        default: [   ],
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Category"
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "SubCategory"
        }
    ],
    unit : {
        type : String,
        default: null
    },
    stock : {
        type: Number,
        default: 0
    },
    price : {
        type: Number,
        default: null
    },
    discount : {
        type: Number,
        default: null
    },
    description : {
        type: String,
        default: ""
    },
    more_details : {
        type: Object,
        default: {}
    },
    publish : {
        type: Boolean,
        default : true
    }
},{timestamps :  true});

//CRERATING TEXT INDEX SO THAT CAN SEARCH DATA EASILY BINARY SEARCH

productSchema.index(
    { name: "text", description: "text" },
    { weights: { name: 10, description: 5 }, name: "TextIndex" }
  );
  

//creating product model
const ProductModel = mongoose.model("Product",productSchema);

export default ProductModel;
