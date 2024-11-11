import mongoose from 'mongoose';

const footprintSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    coordinates: [
        {
            latitude: {
                type: String,
            },
            longitude: {
                type: String,
            },
            time: {
                type: String,
                default: Date.now,
            },
        },
    ],
    startPoint: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },
    endPoint: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },
}, 
{ 
    timestamps: true 
});

// Adding a TTL index on 'createdAt' with a 24-hour expiration
// footprintSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });  // 86400 seconds = 24 hours

export default mongoose.model('Footprint', footprintSchema);
