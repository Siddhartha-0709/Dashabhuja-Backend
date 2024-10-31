import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
  
cloudinary.config({ 
  cloud_name: 'djf6ew5uc', 
  api_key: '224572857724586', 
  api_secret: 'bb_dvWvyFeVeTsnrNg3m8kZz1Zo' 
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Uploading file: ", localFilePath.toString());
    const result = await cloudinary.uploader.upload(localFilePath, {folder: "Dashabhuja"});
    fs.unlinkSync(localFilePath); //Remove the locally saved temporary file as the upload operation failed
    return result;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); //Remove the locally saved temporary file as the upload operation failed
  }
};

export { uploadOnCloudinary };