import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";

const createProduct = async (req, res) => {
    if(!req.file) {
        console.log("Please upload an image");
        return res.status(400).json({ message: "Please upload an image" });
    }
    console.log("Uploading to Cloudinary");
    const imagePath = req.file.path;
    const imageURLCloudinary = await uploadOnCloudinary(imagePath);
    console.log('Image uploaded to Cloudinary:', imageURLCloudinary.secure_url);
    const product = req.body;
    product.imageUrl = imageURLCloudinary.secure_url;
    try {
        const result = await productModel.create(product);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.query.id;
    try {
        const result = await productModel.findByIdAndDelete(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const createOrder = async (req, res) => {
    const order = req.body;
    try {
        const result = await orderModel.create(order);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteOrders = async (req, res) => {
    const id = req.query.id;
    try {
        const result = await orderModel.findByIdAndDelete(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateOrders = async (req, res) => {
    const id = req.query.id;
    const order = req.body;
    try {
        const result = await orderModel.findByIdAndUpdate(id, order);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getOrders = async (req, res) => {
    // const id = req.query.id;
    try {
        const result = await orderModel.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export { createProduct, deleteProduct, getProducts, createOrder, deleteOrders, updateOrders, getOrders }