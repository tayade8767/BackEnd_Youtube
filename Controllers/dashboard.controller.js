const Comment = require('../models/comment.model');
const Tweet = require('../models/tweet.model');
const Vedio = require('../models/vedio.model');
const Like = require('../models/like.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');



// const getChannelStats = asyncHandler(async (req, res) => {
//     // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
// })

const getChannelVideos = asyncHandler(async (req, res) => {

    // TODO: Get all the videos uploaded by the channel

    const loginuser = req.user?._id;

    if(!loginuser){
        throw new ApiError(401, "User is not authenticated");
    }

    const allvedios = await Vedio.find(
        {
            owner:loginuser
        },
        {
            owner:0
        }
    )

    if(!allvedios){
        throw new ApiError(400,"users not getting from the dadabase");
    }

    return res
    .status(201)
    .json(new ApiResponse(200,allvedios,"all vedios of login user get sucessfully from database"));

})


module.exports = {

    // getChannelStats, 
    getChannelVideos

}