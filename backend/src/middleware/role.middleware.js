import { AsyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const verifyRole = AsyncHandler(async(req,res,next)=>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","");

        if(!token){
            return new ApiError(401,"Unauthorized request");
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const  user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401,"Invalid Access");
        }

        if(user.role === 'admin'){
            req.isAdmin = true;
        }

        next();
    }catch(err){
        throw new ApiError(401,err?.message || "invalid access token");
    }
})