var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

// router.use(verifyjwt);

const {  
    // getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
} = require('../Controllers/comment.controller');

// router.use(verifyjwt); // Apply verifyJWT middleware to all routes in this file
// console.log("kjjfbvownbowobnw;obwonowonb[wg[ow[");
router.route('/write-comment/:videoId').post(verifyjwt,addComment);

router.route('/update-comment/:commentId').patch(verifyjwt,updateComment);

router.route('/delete-comment/:commentId').delete(verifyjwt,deleteComment);

// router.route("/:videoId").get(getVideoComments).post(addComment);
// router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

module.exports = router; 