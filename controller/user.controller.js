import alertModel from '../models/alert.model.js';
import footprintModel from '../models/footprint.model.js';
import userModel from '../models/user.model.js';

const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new userModel(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const user = req.body;
    try {
        const result = await userModel.findOne({ email: user.email, password: user.password });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(409).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await userModel.findOne({ email });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateTrustedContacts = async (req, res) => {
    const user = req.body;
    console.log('Received Data--> ',user);
    try {
        const email = user.email;
        const trustedContactsSMS1 = user.trustedContactsSMS[0];
        const trustedContactsSMS2 = user.trustedContactsSMS[1];
        const trustedContactPhone = user.trustedContactsPhone;
        const result = await userModel.findOneAndUpdate({ email: email }, { trustedContactsSMS: [trustedContactsSMS1, trustedContactsSMS2], trustedContactPhone: trustedContactPhone, autoSMS: user.autoSMS, autoCall: user.autoCall });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
};

const updateRecentLocation = async (req, res) => {
    const {email, latitude, longitude} = req.body;
    try {
        const result = await userModel.findOneAndUpdate({ email: email }, { latitude: latitude, longitude: longitude });
        console.log('Location updated successfully');
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
};

const triggerAlert = async (req, res) => {
    const { email, latitude, longitude } = req.body;
    try {
        const result = await alertModel.create({ issuedBy:email, latitude: latitude, longitude: longitude });
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const fetchAlertsNearBy10KM = async (req, res) => {
    const { email, latitude, longitude } = req.body;
    try {
        const result = await alertModel.find({ latitude: { $gte: latitude - 0.1, $lte: latitude + 0.1 }, longitude: { $gte: longitude - 0.1, $lte: longitude + 0.1 } });
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


const initializeJourney = async (req, res) => {
    const {email, startPoint, endPoint} = req.body;
    try {
        const result = await footprintModel.create({email:email, startPoint:startPoint, endPoint:endPoint});
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const setFootprint = async (req, res) => {
    const {email, coordinates} = req.body;
    console.log('coordinates: ', coordinates);
    try {
        const result = await footprintModel.findOneAndUpdate({email:email}, { $push: { coordinates: coordinates } });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const getFootprint = async (req, res) => {
    console.log(req.query);
    const { email } = req.query;
    console.log(email);
    try {
        const result = await footprintModel.findOne({email});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const deleteFootprint = async (req, res) => {
    const {email} = req.body;
    try {
        const result = await footprintModel.findOneAndDelete({email:email});
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export { createUser, loginUser, getUserDetails, updateTrustedContacts, updateRecentLocation, triggerAlert, fetchAlertsNearBy10KM, initializeJourney, setFootprint, getFootprint, deleteFootprint };
