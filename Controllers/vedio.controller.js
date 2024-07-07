
const mongoose = require('mongoose');
const Vedio = require('../models/vedio.model');
const User = require('../models/user.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');
const upload = require('../middleware/multer.middleware');

   /*    we can do it letter  afterwards   */
 
// const getAllVideos = asyncHandler(async (req, res) => {

//     const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
//     //TODO: get all videos based on query, sort, pagination

//     const skip = (page - 1) * limit;

//     const results = await Collection.aggregate([
//         { $match: {} }, // your match criteria here
//         { $sort: { _id: 1 } },
//         { $skip: skip },
//         { $limit: limit }
//     ]);


// })


const publishAVideo = asyncHandler(async (req, res) => {

    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    if(!title) {
        throw new ApiError(404,"title is required")
    }

    if(!description) {
        throw new ApiError(404,"description is required")
    }

    const localvediopath = req.files?.vedioFile[0]?.path;
    const localthumbnailpath = req.files?.thumbnail[0]?.path;
    
    if(!localvediopath) {
        throw new ApiError(400,"Video file path is required");    //  lettter we delete it 
    }
    if(!localthumbnailpath) {
        throw new ApiError(400,"Thumbnail file path is required");      //  lettter we delete it
    }

    const tempvediopath = await uploadOnCloudinary(localvediopath);
    const tempthumbnailpath = await uploadOnCloudinary(localthumbnailpath);

    const vedipath = tempvediopath.url;
    const thumbnailpath = tempthumbnailpath.url;

    const video = await Vedio.create({
        title,
        discription: description,
        thumbnail: thumbnailpath,
        vedioFile: vedipath,
        owner: req.user._id,
        isPublished: true,
        duration: 0,
        views: 0,
    });

    const vediockeck = await Vedio.findById(video._id);

    if(!vediockeck) {
        throw new ApiError(404,"Video not found in database");
    }

    return res.status(201).json(new ApiResponse(200, vediockeck ,"Video Published Successfully"));

})


const getVideoById = asyncHandler(async (req, res) => {

    const { videoId } = req.params;
    console.log(req);
    if(!videoId) {
        throw new ApiError(404,"Vedio Id Not Found");
    }
    //TODO: get video by id
    const presentornotindatabase = await Vedio.findById(videoId);

    if(!presentornotindatabase) {
        throw new ApiError(404,"vedio not present in database");
    }

    return res
    .status(201)
    .json(new ApiResponse(200,presentornotindatabase,"vedio get Sucessfully"));

})


const updateVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params;
    //TODO: update video details like title, description, thumbnail

    const { title, description } = req.body;

    // console.log(videoId)
    // console.log(title)
    // console.log(description);

    if(!videoId || !title || !description) {
        throw new ApiError(401,"vedioid || title || descriotion is not getting");
    }

    const presentornotindatabase = await Vedio.findById(videoId);

    if(!presentornotindatabase) {
        throw new ApiError(401,"vedio is not present in database");
    }
    console.log(req);
    const thumbnailpath = req.file?.path;
    console.log(thumbnailpath)
    const tempthumbmnail = await uploadOnCloudinary(thumbnailpath);
    console.log(tempthumbmnail);
    const thumbnailURL = tempthumbmnail.url;

    if(!thumbnailURL) {
        throw new ApiError(400,"Thumbnail URL not found the from the cloudnairy");
    }

    const updatevedio = await Vedio.findByIdAndUpdate(
        videoId,
        {
            $set: {
            title:title,
            thumbnail:thumbnailURL,
            discription:description
        }
    },
    { new : true }
    );

    if(!updatevedio) {
        throw new ApiError(400,"not found update vedio");
    }

    return res
    .status(201)
    .json(new ApiResponse(200,updatevedio,"Vedio Updated Sucessfully"));

})


const deleteVideo = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    //TODO: delete video
    if(!videoId) {
        throw new ApiError(404,"Vedio Id Not Found");
    }

    const deletevedio = await Vedio.findByIdAndDelete(videoId);

    if(!deletevedio) {
        throw new ApiError(404,"Vedio not found in database");
    }

    return res
    .status(201)
    .json(new ApiResponse(200,deletevedio,"Vedio Deleted Sucessfully"));

})


const togglePublishStatus = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    if(!videoId) {
        throw new ApiError(404,"Vedio Id Not Found in togglepublish");
    }

    /*    Method 1 START       */

    // Fetch the video document first
    // const video = await Vedio.findById(videoId);

    // if (!video) {
    //     throw new ApiError(404, "Video not found in database in togglePublish");
    // }

    // // Toggle the isPublished status
    // const updatedVideo = await Vedio.findByIdAndUpdate(
    //     videoId,
    //     {
    //         $set: {
    //             isPublished: !video.isPublished,
    //         }
    //     },
    //     { new: true }
    // );

    // if (!updatedVideo) {
    //     throw new ApiError(404, "Video not updated in database");
    // }

    // return res
    //     .status(201)
    //     .json(new ApiResponse(200, updatedVideo, "Video toggle change successfully"));

    /*    Method 1 END       */


    /*    Method 2 START       */

    const updatedVideo = await Vedio.findByIdAndUpdate(
        videoId,
        [
            {
                $set: {
                    isPublished: { $not: "$isPublished" }
                }
            }
        ],
        { new: true }
    );

    if (!updatedVideo) {
        throw new ApiError(404, "Video not updated in database");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, updatedVideo, "Video toggle change successfully"));


        /*    Method 2 END        */

})

module.exports ={

    // getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus

}