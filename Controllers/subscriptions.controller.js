const Comment = require('../models/comment.model');
const Tweet = require('../models/tweet.model');
const Vedio = require('../models/vedio.model');
const User = require('../models/user.model');
const Like = require('../models/like.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');
const Playlist = require('../models/playlist.model');




// const toggleSubscription = asyncHandler(async (req, res) => {

//     // TODO: toggle subscription
//     const {channelId} = req.params
//     const userId = req.user._id;

//     if (req.user._id === channelId) {
//         throw new ApiError(400, "You cannot subscibe to yourself");
//       }
  
//       // TODO: toggle subscription
//       const existingSubscription = await subscription.findOne({
//         subscriber: userId,
//         channel: channelId,
//       });
  
//       if (existingSubscription) {
//         await subscription.findOneAndDelete({
//           subscriber: userId,
//           channel: channelId,
//         });
//       } else {
//         const subscribe = await new subscription({
//           subscriber: userId,
//           channel: channelId,
//         });
//         await subscribe.save();
//       }
  
//       const subscriber = await User.findById(req.user._id);

//       const isSubscribed = existingSubscription ? false : true;

//       const totalSubscribers = await subscription.countDocuments(
//         {
//            channel: channelId,
//         }
//       );
  
//       return res.status(201).json(new ApiResponse(201,{ totalSubscribers, isSubscribed, subscriber },"Subscription is toggled successfully"));

// })

// // controller to return subscriber list of a channel
// const getUserChannelSubscribers = asyncHandler(async (req, res) => {

//     const { channelId } = req.params;

//     const user = await User.find(
//         { 
//             _id: channelId 
//         }
//     );

//     if (!user) {
//       throw new ApiError(404, "User not found in database");
//     }

//     const getUserChannelSubscribers = await subscription.find(
//         {
//            channel: channelId,
//         }
//     );

//     if (!getUserChannelSubscribers) {
//       throw new ApiError(400, "No user channel Subscribers found");
//     }

//     return res
//     .status(200)
//     .json(new ApiResponse(200,getUserChannelSubscribers,"Channel Subscribers Successfully Fetched"));

// })

// // controller to return channel list to which user has subscribed
// const getSubscribedChannels = asyncHandler(async (req, res) => {

//     const { subscriberId } = req.params

//     const user = await User.findById(
//         { 
//             _id: subscriberId 
//         }
//     );

//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     const subscribedChannels = await subscription.find(
//         {
//            subscriber: subscriberId,
//         }
//     );

//     return res
//     .status(200)
//     .json(new ApiResponse(200,subscribedChannels,"Channel Subscribers Successfully Fetched"));

// })





module.exports = {

    // toggleSubscription,
    // getUserChannelSubscribers,
    // getSubscribedChannels

}