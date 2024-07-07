
var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// router.use(verifyjwt);

// const {  
//     getLikedVideos,
//     toggleCommentLike,
//     toggleVideoLike,
//     toggleTweetLike,
// } = require('../Controllers/like.controller');


// router.route("/toggle/v/:videoId").post(toggleVideoLike);
// router.route("/toggle/c/:commentId").post(toggleCommentLike);
// router.route("/toggle/t/:tweetId").post(toggleTweetLike);
// router.route("/videos").get(getLikedVideos);


module.exports = router; 






