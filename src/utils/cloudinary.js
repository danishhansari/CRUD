import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

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
    console.log("File has been upload", response);
    fs.unlinkSync(fileNamePath);
    return response;
  } catch (error) {
    fs.unlinkSync(fileNamePath);
    return null;
  }
};

const deleteOnCloudinary = async (assetId) => {
  try {
    if (!assetId) return null;
    const response = await cloudinary.delete_resources([assetId], {
      type: "upload",
      resource_type: "image",
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error.message);
  }
};
export { uploadOnCloudinary, deleteOnCloudinary };
