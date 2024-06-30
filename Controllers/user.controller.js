
    const asyncHandler = require('../Utils/asyncHnadler');

const ApiError = require('../Utils/ApiError');
const User = require("../models/user.model");
const uploadOnCloudinary = require('../Utils/cloudinary');
const ApiResponse = require('../Utils/Apiresponse');

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// below method is for generating access and refresh token at the same time

const generateAccessandRefereshtokenatsametime = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {
            accessToken,
            refreshToken
        }

    } catch (error) {
        throw new ApiError(500,"Something went Wrong while generating access and refresh token at same time");
    }
}

const registerUser = asyncHandler( async (req,res) => {

   /* this is my steps first time */

//    step1 form for input --- postman
//    step2 store in session store karange
//    step3 store the data in the databse -- mongodb
//    step4 user lodin ho gaya to kuch bhi karo

    /*  this is the chai aur code logi  */

//  get the userdetails from frontend
//  validation - not empty
//  check if user is already exists : username, emial
//  check for images and avtar
//  upload them to cloudnarry ( URL )
//  create user object - create entry in db
//  remove password and refresh token field from response
//  check for user creation 
//  return response

    /*   this steps to follow to make the register route */

    const { fullname , email,username , password } = req.body;

    console.log(email); 

    if( [fullname,email,username,password].some((field) => 
       field?.trim() === "")
    ) {
        throw new ApiError(400,"All fields are required");
    }

//  ckeck if the user is already exists

    const userExists = await User.findOne({               
        $or: [{ username },{ email }]
    })

    if(userExists) {          //   if the user is already exists
        throw new ApiError(409,"User with email or username already exists");
    }

    // console.log(req.files)

    const avaterLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;


    if(!avaterLocalPath) {
        throw new ApiError(400,"Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avaterLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // console.log(avatar);
    // console.log(coverImage);

    if(!avatar) {
        throw new ApiError(400,"Avatar file is required for cloudinary upload");
    }

    if(!coverImage) {        //  this is wrriten by me
        throw new ApiError(400,"Cover Image file is required for cloudinary upload");
    }

    const user = await User.create({
        fullname,
        email,
        username : username.toLowerCase(),
        password,
        avatar : avatar.url,
        coverImage : coverImage?.url || ""
    });

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )      //   hame jo select nahi karna ho hum ise select("") mai likthe hai -lagaker

    if(!userCreated) {
        throw new ApiError(500,"Error while Regestering the User")
    }

    return res.status(201).json(
        new ApiResponse(200,userCreated,"User Created Successfully")
    )

})

const loginUser = asyncHandler(async (req,res) => {
    /*      ALGORITHM   STARTS OF MINE    */

        //  get the data form the frontend 
        //  check that user present or not 
        //  if not present then show the message you dont have an account please login
        //  if user present then give him access 
        //  and assign access token to him
        //  and give the login to him 

     /*      ALGORITHM   ENDS OF MINE    */

     /*      ALGORITHM   STARTS OF CHAIAURCODE    */

        //   req body -> data 
        //   username or email
        //   find the user
        //   password check
        //   access and refresh token
        //   send cookie

     /*      ALGORITHM   ENDS OF CHAIAURCODE    */

     console.log(req.body)

     const { username, email,password } = req.body;

     if(!username || !email){
        throw new ApiError(400,"username or password is required");
     }

     const user =await User.findOne({
        $or: [{username}, {email}]
     })

     if(!user) {
        throw new ApiError(404,"user not found in database");
     }

     const isPasswordCorrect = await user.isPasswordCorrect(password);

     if(!isPasswordCorrect) {
        throw new ApiError(401,"user password in database is incorrect");
     }

     const { accessToken, refreshToken } = await generateAccessandRefereshtokenatsametime(user._id);

     const loggedInUser = await User.findById(user._id)
     .select("-password -refreshToken");

     const options = {
        httponly: true,
        secure: true
     }

     return res
     .status(200)
     .cookie("accessToken", accessToken,options)
     .cookie("refreshToken", refreshToken, options)
     .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in Successfully"
        )
     )

})  


const logoutUser = asyncHandler( async (req,res) => {
     await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: null,
            }
        },
        {
            new: true
        }
     )

     const options = {
        httponly: true,
        secure: true
     }
     return res
     .status(200)
     .cookie("accessToken",  options)
     .cookie("refreshToken", options)
     .json(
        new ApiResponse(
            200,
            {},
            "User logged Out"
        )
     )

})


const refreshAccessToken = asyncHandler( async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    console.log(incomingRefreshToken);
    if(!incomingRefreshToken) {
        throw new ApiError(401,"No Incomming Refresh Token || Invalid refresh token || unauthroisez request");
    }


        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findOne(decodedToken?._id);

        if(!user) {
            throw new ApiError(401,"user Not found for the refresh token");
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token is experized for use");
        }

        const options = {
            httponly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessandRefereshtokenatsametime(user._id);

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newrefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,refreshToken: newrefreshToken
                },
                "Access token refreshed"
            )
        )

})


const changeCurrentPassword = asyncHandler( async (req, res) => {

    const { oldPassword,newPassword } = req.body;

    console.log(oldPassword,newPassword);
    
    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect) {
        throw new ApiError(400,"Invalid Old Password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "Password changed successfully"
    ))

})


const getCurrentUser = asyncHandler( async (req, res) => {

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        'User fetched successfully'
    ))

})


const updateAccountDetails = asyncHandler( async(req,res) => {

     const { fullname, email } = req.body;
        console.log(req);
     if(!fullname || !email) {
        throw new ApiError(400, "fullname and email are required for updation of user account");
     }

     const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,           // both the methods are applicable
                email : email      // we can keep it as it is 
            },
        },
        {
            new: true
        }
     ).select("-password")

     return res
     .status(200)
     .json(new ApiResponse(200,
        user,
        "Account Details Update SuccessFully"
     ))

})


const updateUserAvatar = asyncHandler( async (req,res) => {

    const avatarLocalPath = req.file?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing in updation of avatar file");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar.url){
        throw new ApiError(400,"Avater file URL is missing while updating avatar file");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Avater image is Updated SuccessFully"
        )
    )

})


const updateUserCoverImage = asyncHandler(async (req, res) => {

    const coverImageLocalPath = req.file?.path;

    if(!coverImageLocalPath) {
        throw new ApiError(400,"Cover Image path is not Specified || Cover image file is missing")
    }

    const coverimage = await uploadOnCloudinary(coverImageLocalPath);

    if(!coverimage.url) {
        throw new ApiError(400,"Cover Image URL is not Defined")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverimage.url
            }
        },
        {
            new: true
        }
    ).select("-password");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Cover Image Sucessfully"
        )
    )

})


const getUserChannelProfile = asyncHandler( async (req,res) => {

    const { username } = req.params;

    console.log(req.params)

    if(!username?.trim()) {
        throw new ApiError(400, "Username is not getting from the params while going to the profile");
    }

    const channel = await User.aggregate([
        
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup:{
                from: "subscription",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup:{
                from: "subscription",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }

    ])

    if(!channel?.length) {
        throw new ApiError(404, "channel does not exists")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    )

})


const getWatchHistory = asyncHandler(  async (req,res) => {

    const user = await User.aggregate([

        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "vedio",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1,
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }

    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    )

})

module.exports = {

    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
    
};
  
