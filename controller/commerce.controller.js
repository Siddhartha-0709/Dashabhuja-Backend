import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import nodemailer from "nodemailer";

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
    //send mail to seller and buyer
    sendOrderConfirmationMail(order);
    try {
        const result = await orderModel.create(order);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendOrderConfirmationMail = async (newOrder) => {
    try {
        const product = await productModel.findById(newOrder.product);
        await transporter.sendMail({
            to: `${newOrder.sellerEmail},${newOrder.buyerEmail}`,
            subject: "Order Confirmation",
            html: `
            <style>
                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }

                td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                tr:nth-child(even) {
                    background-color: #dddddd;
                }
            </style>
            <h2>Order Confirmation</h2> 
            <h4>Order Details are as follows</h4>
            <table>
                <tr>
                    <td colspan="2"><img src="${product.imageUrl}" width="50%" height="auto" /></td>
                </tr>
                <tr>
                    <th>Product Name</th>
                    <td>${product.name}</td>
                </tr>
                <tr>
                    <th>Product Price</th>
                    <td>₹${product.price}</td>
                </tr>
                <tr>
                    <th>Product Description</th>
                    <td>${product.description}</td>
                </tr>
                <tr>
                    <th>Buyer Contact Email</th>
                    <td>${newOrder.buyerEmail}</td>
                </tr>
                <tr>
                    <th>Seller Contect Email</th>
                    <td>${newOrder.sellerEmail}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>${newOrder.address}</td>
                </tr>
            </table>
            `
        });
        console.log("Order confirmation mail sent");
    } catch (error) {
        console.log(error);
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