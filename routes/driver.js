const express = require('express');
const { DriverController } = require('../Controllers');
const {Sms} = require('../Utils');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('driver');
});
router.get('/list/all', DriverController.allDriversList);

router.post('/add', DriverController.addDriver);
router.post('/update/state', DriverController.acceptOrRejectDriver, Sms.sendMessageOnAdminActionOnDriver);

module.exports = router;
