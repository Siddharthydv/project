import {v2 as cloudinary} from cloudinary;
import fs from "fs";
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,file.originalname)
    }
})
const uploadcloudinary=async (localfilepath)=>{
    try{
     if(!filepath){console.log("filepath empty!!");return null;}
     const response =await cloudinary.uploader.upload(localfilepath,{ resource_type:"auto" })
     console.log("file uploaded ar on cloudinary",response.url);
     return response;
    }
    catch(error){
        fs.unlink(localfilepath,()=>{console.log("file upload on cloudinary failed")})
    };
}
export const upload=multer({storage:storage})
export {uploadcloudinary}
