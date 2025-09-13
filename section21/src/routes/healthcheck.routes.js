const express = require('express');
const router = express.Router();
const healthCheck = require('../controllers/healthcheck.controllers.js');


router.route("/").get(healthCheck);


module.exports = router ; 