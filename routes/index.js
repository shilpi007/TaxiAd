const express = require('express');
const {AuthController} = require('../Controllers');
const router = express.Router();

// import all routes

const adminRoute = require('./admin');
const campaignRoute = require('./campaign');
const companyRoute = require('./company');
const driverRoute = require('./driver');
const privateRoute = require('./private');
const otpRoute = require('./otp');
// use all routes

router.use('/admin', adminRoute);
router.use('/campaign', campaignRoute);
router.use('/company', companyRoute);
router.use('/driver', driverRoute);
router.use('/private',  AuthController.keyFilter,privateRoute);
router.use('/otp',  otpRoute);

module.exports = router;
