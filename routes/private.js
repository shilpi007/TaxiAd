const express = require('express');
const { AuthController } = require('../Controllers');
const { Mail, Distance } = require('../Utils');
const { DriverCampaignController } = require('../Controllers');
const router = express.Router();

/* GET users listing. */
router.post(
  '/cron/sendMail/:token',
  AuthController.refreshToken,
  Mail.sendUploadPhotoMailAtEndOfCampaign,
  DriverCampaignController.removeDriverFromCampaign
);

router.post('/update/distance', Distance.updateDistance);

module.exports = router;
