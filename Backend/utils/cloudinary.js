import { v2 as cloudinary } from "cloudinary";
import {config} from 'dotenv'

config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


//@ Uploading the files on cloudinary
// const uploadDataOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     //uploading file on cloudinary
//     const uploadData = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     console.log("File uploaded successfully on cloudinary ", uploadData.url);
    
//     return uploadData
//     fs.unlinkSync(localFilePath)

//   } catch (error) {
//     fs.unlink(localFilePath); // it will remove the locally saved temporary file as the upload operation got failed.
//     return null;
//   }
// };

export {cloudinary}