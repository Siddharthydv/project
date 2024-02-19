import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true, 
    },
    fullName: {
        type: String,
        required: true,
        trim: true, 
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }

},{timestamps: true})
userSchema.pre("save",async function(next){
    if(!this.modified("password"))return next();//without this block bcrypt would hash password everytime we hit save
    this.password=bcrypt.hash(this.password,10);
    next();

})
//authenticating password during login.
userSchema.method.ispasswordcorrect=async function(password)//password entered by user during login 
{
  await bcrypt.compare(password,this.password)//this.password is the password entered during signup.
}
//gnerating access and refresh token
userSchema.method.generateaccesstoken=function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRE
    }
    )
}
userSchema.method.generaterefreshtoken=function(){
    return jwt.sign({
         id:this.id,
         email:this.email,
         username:this.username,
         fullname:this.fullname
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRE
     }
     )
 }
export const User=mongoose.model("User",userSchema);