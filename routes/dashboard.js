var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

const { 
    // getChannelStats, 
    getChannelVideos 
} = require('../Controllers/dashboard.controller');

// router.route("/stats").get(getChannelStats);
router.route("/videos").get(verifyjwt,getChannelVideos);

module.exports = router; 