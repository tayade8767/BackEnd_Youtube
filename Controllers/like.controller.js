const Comment = require('../models/comment.model');
const Tweet = require('../models/tweet.model');
const Vedio = require('../models/vedio.model');
const Like = require('../models/like.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');



const toggleVideoLike = asyncHandler(async (req, res) => {

    const {videoId} = req.params
    //TODO: toggle like on video

    

})

// const toggleCommentLike = asyncHandler(async (req, res) => {
//     const {commentId} = req.params
//     //TODO: toggle like on comment

// })

// const toggleTweetLike = asyncHandler(async (req, res) => {
//     const {tweetId} = req.params
//     //TODO: toggle like on tweet
// }
// )

// const getLikedVideos = asyncHandler(async (req, res) => {
//     //TODO: get all liked videos
// })



module.exports = {

    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,

}