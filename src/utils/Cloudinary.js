import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileNamePath) => {
  try {
    if (!fileNamePath) return null;
    const response = await cloudinary.uploader.upload(fileNamePath, {
      resource_type: "auto",
    });
    console.log("File has been upload", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(fileNamePath);
    return null;
  }
};
export { uploadOnCloudinary };