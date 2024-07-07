var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// const {  
//     toggleSubscription,
//     getUserChannelSubscribers,
//     getSubscribedChannels
// } = require('../Controllers/subscriptions.controller');


// router.route('/toggleSubscription/:channelId').post(verifyjwt, toggleSubscription);

// router.route('/getsubscribers/:channelId').get(verifyjwt, getUserChannelSubscribers);

// router.route('/getSubscribedChannels/:subscriberId').get(verifyjwt, getSubscribedChannels);


module.exports = router; 