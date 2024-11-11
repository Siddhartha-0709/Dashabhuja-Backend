import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import incidentModel from "../models/incident.model.js";
import nodemailer from "nodemailer";
const createIncident = async (req, res) => {    
    if(!req.file) {
        console.log("Please upload an image");
        return res.status(400).json({ message: "Please upload an image" });
    }
    console.log("Uploading to Cloudinary");
    const imagePath = req.file.path;
    const imageURLCloudinary = await uploadOnCloudinary(imagePath);
    console.log('Image uploaded to Cloudinary:', imageURLCloudinary.secure_url);
    const incident = req.body;
    incident.imageUrl = imageURLCloudinary.secure_url;
    const newIncident = new incidentModel(incident);
    try {
        await newIncident.save();
        await sendMailToAllUsers(newIncident);
        res.status(201).json(newIncident);
    } catch (error) {
        console.log(error);
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
const sendMailToAllUsers = async (incident) => {
    try {
        const users = await userModel.find();
        const emails = users.map(user => user.email);
        const mailOptions = {
            from: process.env.EMAIL,
            to: emails,
            subject: 'A new incident has been reported',
            html: `
            <style>
                img {
                    width: 100%;
                    height: auto;
                    margin: 10px 0;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                }
                p {
                    margin-bottom: 20px;
                }
            </style>
            <h2>A new incident has been reported</h2>
            <p>Details of the incident are as follows:</p>
            <ul>
                <img src="${incident.imageUrl}">
                <li><strong>Title:</strong> ${incident.title}</li>
                <li><strong>Description:</strong> ${incident.description}</li>
                <li><strong>Location:</strong> ${incident.location}</li>
                <li><strong>Date:</strong> ${incident.date}</li>
                <li><strong>Latitude:</strong> ${incident.latitude}</li>
                <li><strong>Longitude:</strong> ${incident.longitude}</li>
            </ul>
            <p>This Email has been sent from Dashabhuja Incident Management System</p>
            <p>To unsubscribe, please write to us at <a href="mailto:siddharthamukherjee0709@gmail.com">siddharthamukherjee0709@gmail.com</a></p>`
        };
        await transporter.sendMail(mailOptions);
        console.log('Mail sent to all users');
    } catch (error) {
        console.log('Error sending mail to all users: ', error);
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