import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import incidentModel from "../models/incident.model.js";

const createIncident = async (req, res) => {    
    if(!req.file) {
        console.log("Please upload an image");
        return res.status(400).json({ message: "Please upload an image" });
    }
    console.log("Uploading to Cloudinary");
    const imagePath = req.file.path;
    const imageURLCloudinary = await uploadOnCloudinary(imagePath);
    console.log('Image uploaded to Cloudinary:', imageURLCloudinary.url);
    const incident = req.body;
    incident.imageUrl = imageURLCloudinary.url;
    const newIncident = new incidentModel(incident);
    try {
        await newIncident.save();
        res.status(201).json(newIncident);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

const getIncidents = async (req, res) => {
    try {
        const incidents = await incidentModel.find();
        res.status(200).json(incidents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { createIncident, getIncidents }