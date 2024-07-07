const mongoose = require('mongoose');
const Vedio = require('../models/vedio.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');
const upload = require('../middleware/multer.middleware');

// const getVideoComments = asyncHandler(async (req, res) => {
//     //TODO: get all comments for a video
//     const {videoId} = req.params
//     const {page = 1, limit = 10} = req.query

// })
const addComment = asyncHandler(async (req, res) => {
    console.log('kljdnfgnsdi');

    // TODO: add a comment to a video
    const { videoId } = req.params;

    if(!videoId) {
        throw new ApiError(400, "Video ID is required");
    }

    const { comment } = req.body;

    if(!comment) {
        throw new ApiError(400, "Comment is required");
    }

    const newcomment =  await Comment.create({

        content:comment,
        vedio: videoId,
        owner: req.user?._id,

    })

    const commentornot = await Comment.findById(newcomment._id);

    if(!commentornot) {
        throw new ApiError(400, "Comment not created in database is required");
    }

    return res
    .status(201)
    .json(new ApiResponse(200, commentornot ,"Comment Added to Vedio Successfully"));

})

const updateComment = asyncHandler(async (req, res) => {

    // TODO: update a comment
    // console.log('kljdnfgnsdi');

    // TODO: add a comment to a video
    const { commentId } = req.params;

    if(!commentId) {
        throw new ApiError(400, "Video ID is required");
    }

    const { updatecomment } = req.body;

    if(!updateComment) {
        throw new ApiError(400, "Comment is required");
    }

    const commentowner = await Comment.findById(commentId);

    const { owner: { _id: commentownerid } } = commentowner;
//     const { owner } = commentowner;
//     const { _id: commentownerid } = owner;


    console.log(req.user?._id);
    console.log(commentownerid);
    // console.log(commentowner);

    if(!commentownerid.equals(req.user?._id)){
        throw new ApiError(400, "comment owner and login user is not matching");
    }

    /*  Method update START 1  */

    // const updatedcomment = await Comment.findByIdAndUpdate(commentId,
    //     [
    //         {
    //             $set : {
    //                 content : updatecomment
    //             }
    //         }
    //     ]
    // )

    /*  Method update END 1  */

    /*  Method update START 2  */

    const updatedcomment = await Comment.findByIdAndUpdate(
        commentId,
        { content: updatecomment },
        { new: true }
    );

    /*  Method update END 2  */

    if(!updatedcomment) {
        throw new ApiError(400, "update Comment not");
    }

    return res
    .status(201)
    .json(new ApiResponse(200, updatedcomment ,"Comment update to Vedio Successfully"));


})

const deleteComment = asyncHandler(async (req, res) => {

    // TODO: delete a comment
    // TODO: update a comment
    // console.log('kljdnfgnsdi');

    // TODO: add a comment to a video
    const { commentId } = req.params;

    if(!commentId) {
        throw new ApiError(400, "Video ID is required");
    }

    const commentowner = await Comment.findById(commentId);

    const { owner: { _id: commentownerid } } = commentowner;
//     const { owner } = commentowner;
//     const { _id: commentownerid } = owner;


    // console.log(req.user?._id);
    // console.log(commentownerid);
    // console.log(commentowner);

    if(!commentownerid.equals(req.user?._id)){
        throw new ApiError(400, "comment owner and login user is not matching");
    }

    const deletecomment = await Comment.findByIdAndDelete(commentId);

    if(!deletecomment) {
        throw new ApiError(400, "comment not deleted");
    }

    return res
    .status(201)
    .json(new ApiResponse(200, deletecomment ,"Comment delete from Vedio Successfully"));

})

module.exports ={

    // getVideoComments, 
    addComment, 
    updateComment,
    deleteComment

}