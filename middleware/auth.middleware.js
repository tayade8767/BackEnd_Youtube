
//    it only check ki user hai ki nahi hai

const jwt = require('jsonwebtoken');
const ApiError = require('../Utils/ApiError');
const asyncHandler = require('../Utils/asyncHnadler');
const User = require('../models/user.model');


const verifyJWT = asyncHandler( async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header
        ("Authorization")?.replace("Bearer ","");
    
        if(!token) {
            throw new ApiError(401,"Invalid token")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id)
        .select("-password -refreshToken")
    
        if(!user) {
            //   NEXT LECTURE MEANS LECTURE 17 in backend chai aur code discuss about frontend
            throw new ApiError(401,"Invalid token by decoded user")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,"invalid access token")
    }

} )

module.exports = verifyJWT;
