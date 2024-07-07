var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// router.use(verifyjwt);

const {  
    // getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
} = require('../Controllers/vedio.controller');


router.route('/publish-Video').post(verifyjwt,
     upload.fields([
        {
            name:"thumbnail",
            maxCount: 1,
        },
        {
            name:"vedioFile",
            maxCount: 1,
        }
     ])
    ,publishAVideo
);

router.route('/get-vedio/:videoId').get(getVideoById);

router.route('/update-Video/:videoId').patch(verifyjwt,
    upload.single("thumbnail"),
    updateVideo
);

router.route('/delete-video/:videoId').delete(verifyjwt, deleteVideo);

router.route('/toggle-publish/:videoId').patch(verifyjwt, togglePublishStatus);


module.exports = router; 