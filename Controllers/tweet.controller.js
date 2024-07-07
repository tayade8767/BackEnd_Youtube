const mongoose = require('mongoose');
const Vedio = require('../models/vedio.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const Tweet = require('../models/tweet.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');

const createTweet = asyncHandler(async (req, res) => {

    //TODO: create tweet

    const { mytweet } = req.body;
    console.log(mytweet);
    if(mytweet !== undefined ){

        if(!mytweet) {
            throw new ApiError(400, "Tweet is required");
        }
    
        const newtweet =  await Tweet.create({
    
            content:mytweet,
            owner: req.user?._id,
    
        })
    
        const tweetcreateornot = await Tweet.findById(newtweet._id);
    
        if(!tweetcreateornot) {
            throw new ApiError(400, "Tweet not in string created in database");
        }

        return res
        .status(201)
        .json(new ApiResponse(200, tweetcreateornot ,"Tweet Added to User Account Successfully"));

    } else if(req.file?.path !== "") {

        const tempfilepath = req.file?.path;

        const cloudinaryTweetURL = await uploadOnCloudinary(tempfilepath);

        console.log(cloudinaryTweetURL);

        const newtweet =  await Tweet.create({
    
            content:cloudinaryTweetURL.url,
            owner: req.user?._id,
    
        })
    
        const tweetcreateornot = await Tweet.findById(newtweet._id);
    
        if(!tweetcreateornot) {
            throw new ApiError(400, "Tweet not in image created in database");
        }

         return res
        .status(201)
        .json(new ApiResponse(200, tweetcreateornot ,"Tweet Added to User Account Successfully"));

    } else {

        throw new ApiError(400, "your both fields are null tewwt image  or string ");

    }


})

const getUserTweets = asyncHandler(async (req, res) => {

    // TODO: get user tweets
    const loginuserid = req.user?._id;
    
    // console.log(loginuserid)

    const alltweetsofloginuse = await Tweet.find({ owner:loginuserid}, { content:true, _id:false }); 

    // db.collection.find( <query>, <projection>, <options> )     //  projection true means including and false for excluding

    // const alltweetsofloginuse = await Tweet.find({ owner:loginuserid}, { content:true, _id:false });
    // const alltweetsofloginuse = await Tweet.find({ owner:loginuserid});

    // console.log(alltweetsofloginuse)
    
    if(!alltweetsofloginuse){
        throw new ApiError(400,"Not getting tweets of Loged in User")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, alltweetsofloginuse,"All Tweets of User"));

})

const updateTweet = asyncHandler(async (req, res) => {

    //TODO: update tweet
    const { tweetId } = req.params;
    // console.log(tweetId);
    const tewwtowner = await Tweet.findById(tweetId);

    // console.log(tewwtowner)

    const { owner: { _id: tweetownerid } } = tewwtowner;
//     const { owner } = commentowner;
//     const { _id: commentownerid } = owner;


    // console.log(req.user?._id);
    // console.log(tweetownerid);
    // console.log(commentowner);

    if(!tweetownerid.equals(req.user?._id)){
        throw new ApiError(400, "tweet owner and login user is not matching so you can not update");
    }

    const { mytweet } = req.body;

    console.log(mytweet);
    if(mytweet !== undefined ){

        if(!mytweet) {
            throw new ApiError(400, "Tweet is required");
        }

    
        const findtweet = await Tweet.findByIdAndUpdate(tweetId,
            {
                $set: {
                    content:mytweet,
                }
            },
            {
                new : true
            }
        )
    
        if(!findtweet) {
            throw new ApiError(400, "Tweet not updated database");
        }

        return res
        .status(201)
        .json(new ApiResponse(200, findtweet ,"Tweet Added to User Account Successfully"));

    } else if(req.file?.path !== "") {

        const tempfilepath = req.file?.path;

        const cloudinaryTweetURL = await uploadOnCloudinary(tempfilepath);

        console.log(cloudinaryTweetURL);
        
        const findtweet = await Tweet.findByIdAndUpdate(tweetId,
            {
                $set: {
                    content:cloudinaryTweetURL.url,
                }
            },
            {
                new : true
            }
        )
    
        if(!findtweet) {
            throw new ApiError(400, "Tweet not updated database");
        }

        return res
        .status(201)
        .json(new ApiResponse(200, findtweet ,"Tweet Added to User Account Successfully"));

    } else {

        throw new ApiError(400, "your both fields are null tewwt image  or string ");

    }


})

const deleteTweet = asyncHandler(async (req, res) => {

    //TODO: delete tweet
    const { tweetId } = req.params;

    if(!tweetId) {
        throw new ApiError(404,"Tweet Id Not Found");
    }

    console.log(tweetId);

    const tewwtowner = await Tweet.findById(tweetId);

    const { owner: { _id: tweetownerid } } = tewwtowner;

    if(!tweetownerid.equals(req.user?._id)){
        throw new ApiError(400, "tweet owner and login user is not matching so you can not update");
    }

    const deleteTweet = await Tweet.findByIdAndDelete(tweetId);

    if(!deleteTweet){
        throw new ApiError(400,"Tweet is not deleted")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,deleteTweet,"Tweet Deleted sucessfully"));

})

module.exports = {

    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet

}