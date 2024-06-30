var express = require('express');
var router = express.Router();

const upload = require('../middleware/multer.middleware');
const verifyjwt = require('../middleware/auth.middleware');

// const registerUser = require('../Controllers/user.controller');
// const loginUser = require('../Controllers/user.controller');
// const logoutUser = require('../Controllers/user.controller');
// const changeCurrentPassword = require('../Controllers/user.controller');
// const refreshAccessToken = require('../Controllers/user.controller');
// const getWatchHistory = require('../Controllers/user.controller');
// const getUserChannelProfile = require('../Controllers/user.controller');
// const updateUserCoverImage = require('../Controllers/user.controller');
// const updateUserAvatar = require('../Controllers/user.controller');
// const updateAccountDetails = require('../Controllers/user.controller');
// const getCurrentUser = require('../Controllers/user.controller');


const {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    refreshAccessToken,
    getWatchHistory,
    getUserChannelProfile,
    updateUserCoverImage,
    updateUserAvatar,
    updateAccountDetails,
    getCurrentUser
} = require('../Controllers/user.controller');


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser        
);

router.route("/login").post(loginUser);

//    secured routes

router.route('/logout').post(verifyjwt,logoutUser);

router.route('/refresh-token').post(refreshAccessToken); // not donw till yet in postman

router.route('/change-password').post(verifyjwt,changeCurrentPassword);

router.route('/current-user').post(verifyjwt,getCurrentUser);

router.route('/update-account').patch(verifyjwt,updateAccountDetails);

router.route('/update-avatar').patch(verifyjwt,upload.single("avatar"),updateUserAvatar);

router.route('/update-coverimage').patch(verifyjwt,upload.single("coverImage"),updateUserCoverImage);

router.route('/c/:username').get(verifyjwt,getUserChannelProfile);

router.route('/history').get(verifyjwt,getWatchHistory);

module.exports = router; 