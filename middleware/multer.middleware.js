// const multer = require('multer');
// // const kk = require('../UploadedContaint')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../UploadedContaint")
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname)
//     }
//   })
//   const upload = multer({ storage });                                     //  this is the old code 

//  module.exports =  upload;



const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../UploadedContaint'));                //  this is the updated code for resolution of the path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
