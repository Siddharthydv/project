import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
const app=express();
export default app;
app.use(cors({
    origin:process.env.cors_origin,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"
app.use("/user",userRouter)
export {app}
