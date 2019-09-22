const express = require('express');
const { AuthController, CampaignController, DriverCampaignController } = require('../Controllers');
const { Mail, Sms } = require('../Utils');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('campaign');
});
router.get('/list/all', AuthController.validateToken, CampaignController.allCampaignsList);
router.get('/details',CampaignController.campaignDetails);


router.post('/add', CampaignController.addCampaign);
router.post(
  '/add/driver',
  DriverCampaignController.addDriverToCampaign,
  AuthController.generateToken,
  Mail.sendUploadPhotoMail,
  Sms.sendMessageOnDriverAddToCampaign
);
router.post('/list/NameAndIdByCity', CampaignController.campaignListByCity);
router.get('/list/NameAndIdById', AuthController.validateToken,CampaignController.getCampaignListById);
router.post('/distanceTravelled' ,CampaignController.distanceTraveled);

module.exports = router;
