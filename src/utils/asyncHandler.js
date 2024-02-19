import { json } from "express";
const asyncHandler=(requestHandler)=>{//reqhand...is the callback(middleware) we pass in app.get
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err)=>next(err))
    }
}
// const asyncHandler=(func)=>async(req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(err.code||500).json({
//             success:false,
//             message:err.message
//         });  
//     }
// }
export {asyncHandler}