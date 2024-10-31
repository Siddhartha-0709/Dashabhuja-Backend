import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    latitude:{
        type: String,
    },
    longitude:{
        type: String,
    },
    trustedContactsSMS:[{
        type: String,
    }],
    trustedContactPhone:{
        type: String,
    },
    autoSMS:{
        type: Boolean,
        default: false,
    },
    autoCall:{
        type: Boolean,
        default: false,
    },
    reportedIncidents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incident',
    }],
});

export default mongoose.model('User', userSchema);
