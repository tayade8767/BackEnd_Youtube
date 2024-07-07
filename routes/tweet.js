
var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// router.use(verifyjwt);

const {  
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
} = require('../Controllers/tweet.controller');

router.route('/createTweet').post(verifyjwt,
    upload.single('createTweetimage')
    ,createTweet);

router.route('/updateTweet/:tweetId').patch(verifyjwt,
    upload.single('updateTweetimage'),
    updateTweet);

router.route('/deleteTweet/:tweetId').delete(verifyjwt,
    deleteTweet);

router.route('/getallTweets').get(verifyjwt,getUserTweets)

// router.route("/").post(createTweet);
// router.route("/user/:userId").get(getUserTweets);
// router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);


module.exports = router; 