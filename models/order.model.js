import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    buyerEmail:{
        type: String,
        required: true
    },
    sellerEmail:{
        type: String,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    address:{
        type: String,
        required: true
    }
}, {timestamps: true});
export default mongoose.model("Order", orderSchema)