
var express = require('express');
var router = express.Router();
const verifyjwt = require('../middleware/auth.middleware');
const upload = require('../middleware/multer.middleware');

const { healthcheck } = require('../Controllers/health.controller');

router.route('/').get(verifyjwt,healthcheck);

module.exports = router; 






