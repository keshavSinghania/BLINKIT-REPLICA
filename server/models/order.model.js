import mongoose from "mongoose";

//creating order schema
const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId : {
        type: String,
        required: [true, "Must provide order id"],
        unique: true
    },
    productId : {
        type: mongoose.Schema.ObjectId,
        ref : "Product"
    },
    product_details :{
        name: String,
        image: Array
    },
    payment_id : {
        type: String,
        default:""
    },
    payment_status : {
        type: String,
        default:""
    },
    delivery_address : {
        type: mongoose.Schema.ObjectId,
        ref : "Address"
    },
    subTotalAmt: {
         type: Number,
         default: 0
    },
    totalAmt: {
         type: Number,
         default: 0
    },
    invoice_receipt : {
        type: String,
        default: ""
    }

},{
    timestamps:true
});

//creating order model
const OrderModel = mongoose.model("Order",orderSchema);

export default OrderModel;