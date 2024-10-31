import mongoose from "mongoose";
const communityPostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    userEmail:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    }
}, {timestamps: true});

export default mongoose.model("CommunityPost", communityPostSchema);