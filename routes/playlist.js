var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

const {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
} = require('../Controllers/playlist.controller');



router.route("/createPlaylist").post(verifyjwt,createPlaylist);

router.route("/getplaylists/:playlistId").get(verifyjwt,getPlaylistById);

router.route('/addVideoToPlaylist/:playlistId/:videoId').get(verifyjwt,addVideoToPlaylist);

router.route('/getUserPlaylists/:userId').get(verifyjwt,getUserPlaylists);

router.route('/updatePlaylist/:playlistId').patch(verifyjwt,updatePlaylist);

router.route('/deletePlaylist/:playlistId').delete(verifyjwt,deletePlaylist);

router.route('/removeVideoFromPlaylist/:playlistId/:videoId').patch(verifyjwt,removeVideoFromPlaylist);

// router
//     .route("/:playlistId")
//     .get(getPlaylistById)
//     .patch(updatePlaylist)
//     .delete(deletePlaylist);

// router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
// router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

// router.route("/user/:userId").get(getUserPlaylists);


module.exports = router; 