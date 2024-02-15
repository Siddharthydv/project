//require('dotenv').config({path:'/.env'})
import dotenv from "dotenv"
import connectDB from "./db/db.js";
import app from "./app.js"
dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port: ${process.env.PORT}`);
        app.get('/',(req,res)=>{
                res.send('/ accessed ,server running at port 4000')
            })
    })
})
.catch((err)=>{
    console.log("mongodb connection failed!!!",err);
})