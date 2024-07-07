const Comment = require('../models/comment.model');
const Tweet = require('../models/tweet.model');
const Vedio = require('../models/vedio.model');
const Like = require('../models/like.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');







const healthcheck = asyncHandler(async (req, res) => {

    //TODO: build a healthcheck response that simply returns the OK status as json with a message

    return res
    .status(200)
    .json(new ApiResponse(201,"Ok"));

})








module.exports = {

    healthcheck

}