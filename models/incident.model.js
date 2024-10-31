import mongoose from "mongoose";
const incidentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    location:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    latitude:{
        type: String,
    },
    longitude:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
    status:{
        type: String,
        default: 'Pending'
    },
    userEmail:{
        type: String,
        required: true
    }, 
    reportedDate:{
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('Incident', incidentSchema)