import mongoose from "mongoose";

//creating address schema

const addressSchema = new mongoose.Schema({
    address_line : {
        type: String,
        default: null
    },
    city : {
        type: String,
        default: null,
    },
    state : {
        type: String,
        default: null
    },
    pincode : {
        type: String,
        default: null
    },
    country : {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true,
    },
    mobile : {
        type: String,
        default: null
    }
},{ timestamps: true});


//creating model
const AddressModel = mongoose.model("Address",addressSchema);

export default AddressModel;