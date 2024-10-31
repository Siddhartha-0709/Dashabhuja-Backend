import mongoose from "mongoose";
import 'dotenv/config'
import app from "./app.js";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error Connecting to MongoDB', error);
    }
}

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});