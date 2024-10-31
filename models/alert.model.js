import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    issuedBy: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    createdAt: {  // Renamed to 'createdAt' for clarity
        type: Date,
        default: Date.now,
        expires: 600  // Expire document 10 minutes (600 seconds) after creation
    },
    status: {
        type: String,
        default: 'Pending',
    },
});

// Export the model
export default mongoose.model('Alert', alertSchema);
