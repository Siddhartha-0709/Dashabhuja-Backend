import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import communityPostModel from "../models/communityPost.model.js";

const createPost = async (req, res) => {
    if(!req.file) {
        console.log("Please upload an image");
        return res.status(400).json({ message: "Please upload an image" });
    }
    console.log("Uploading to Cloudinary");
    const imagePath = req.file.path;
    const imageURLCloudinary = await uploadOnCloudinary(imagePath);
    console.log('Image uploaded to Cloudinary:', imageURLCloudinary.url);
    const communityPost = req.body;
    communityPost.imageUrl = imageURLCloudinary.url;
    const newComunityPost = new communityPostModel(communityPost);
    try {
        await newComunityPost.save();
        res.status(201).json(newComunityPost);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await communityPostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { createPost, getPosts }