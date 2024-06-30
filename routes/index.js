var express = require('express');
var router = express.Router();
const cors = require('cors');

//   .env file and url 
const dotenv = require('dotenv');

require('dotenv').config({
  path: './.env'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});






















module.exports = router;
