const Comment = require('../models/comment.model');
const Tweet = require('../models/tweet.model');
const Vedio = require('../models/vedio.model');
const Like = require('../models/like.model');
const ApiError = require('../Utils/ApiError');
const ApiResponse = require('../Utils/Apiresponse');
const asyncHandler = require('../Utils/asyncHnadler');
const uploadOnCloudinary = require('../Utils/cloudinary');
const Playlist = require('../models/playlist.model');



const createPlaylist = asyncHandler(async (req, res) => {

    const { name, description } = req.body

    //TODO: create playlist

    if(!name || !description){
        throw new ApiError(400,'name and description is required')
    }

    const newmyplaylist = await Playlist.create({
        name,
        description,
        owner: req.user?._id
    })

    const findPlaylist = await Playlist.findById(newmyplaylist._id);

    if(!findPlaylist){
      throw  new ApiError(400,"playlist is not created")
    }

    return res
    .status(201)
    .json(new ApiResponse(200, findPlaylist,"Playlist created Successfully"));
 
})

const getUserPlaylists = asyncHandler(async (req, res) => {

    const { userId } = req.params
    //TODO: get user playlists

    if(!userId){
        throw new ApiError(404,"User Id Not Found");
    }

    const findUserPlayLists = await Playlist.find(
        {
            owner: userId
        }
    ).populate('vedios');

    if(!findUserPlayLists){
        throw new ApiError(404,"User playlists are not present in database")
    }

    return res
    .status(201)
    .json(new ApiResponse(200,findUserPlayLists,"User playlists has retrived"));

})

const getPlaylistById = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;
    //TODO: get playlist by id

    if(!playlistId){
        throw new ApiError(404,"Playlist Id Not Found");
    }

    const getplayList= await Playlist.findById(playlistId);

    if(!getplayList){
        throw new ApiError(404,"Playlist is not present in database")
    }
     
    return res
    .status(201)
    .json(new ApiResponse(200,getplayList,"all playlist has retrived by user"));

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {

    const {playlistId, videoId} = req.params

    if(!playlistId || !videoId) {
        throw new ApiError(400,'playlistId and videoId is required')
    }

    const vedio = await Vedio.findById(videoId);
    console.log(vedio)
    if(!vedio){
        throw new ApiError(400,"Video is not present in database")
    }

    const vediopushtopalylist = await Playlist.findByIdAndUpdate(
        {
            _id: playlistId
        },
        {
            $push : {
                vedios:vedio
            }
        },
        {
            new : true
        }
    )

    const playlist = await Playlist.findById(playlistId).populate('vedios');
console.log(playlist);


    if(!vediopushtopalylist) {
        throw new ApiError(400,"Video is not added to playlist")
    }

    return res
   .status(201)
   .json(new ApiResponse(200, vediopushtopalylist,"Video added to playlist Successfully"));

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } = req.params;
    // TODO: remove video from playlist

    if(!playlistId || !videoId) {
        throw new ApiError(400,'playlistId and videoId is required')
    }

    const removevediofrompalylist = await Playlist.findByIdAndUpdate(
        {
            _id: playlistId
        },
        {
            $pull : {
                vedios:videoId
            }
        },
        {
            new : true
        }
    ).populate('vedios');

    if(!removevediofrompalylist){
        throw new ApiError(400,"Video is not removed from playlist")
    }

    return res
   .status(201)
   .json(new ApiResponse(200, removevediofrompalylist,"Video removed from playlist Successfully"));

})

const deletePlaylist = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;

    if(!playlistId) {
        throw new ApiError(400,'playlistId is required')
    }

    const deletePlaylist = await Playlist.findByIdAndDelete(
        {
            _id: playlistId
        },
        {
            new : true
        }
    )

    if(!deletePlaylist) {
        throw new ApiError(400,"Playlist is not deleted")
    }

    return res
   .status(201)
   .json(new ApiResponse(200,deletePlaylist,"delete palylist sucessfully"));

})

const updatePlaylist = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;

    const { name, description } = req.body;
    //TODO: update playlist

    if(!playlistId || !name || !description) {
        throw new ApiError(400,'playlistId, name and description is required')
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        {
            _id: playlistId
        },
        {
            $set: {
                name,
                description
            }
        },
        {
            new : true
        }
    )

    if(!updatedPlaylist) {
        throw new ApiError(400,"Playlist is not updated")
    }

    return res
   .status(201)
   .json(new ApiResponse(200,updatedPlaylist,"updated palylist sucessfully"));

})



module.exports = {

    createPlaylist,
    getUserPlaylists, 
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist

}