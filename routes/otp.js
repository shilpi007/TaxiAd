const express = require('express');
const { AuthController } = require('../Controllers');
const { Otp, Sms } = require('../Utils');
const router = express.Router();

/* GET users listing. */
router.post('/generate', Otp.generateOtp, Sms.sendOtp, AuthController.generateToken, async (req, res) => {
  res.send({
    hasError: false,
    message: 'otp sent successfull',
    token: req.token,
  });
});

router.post(
  '/validate',
  AuthController.validateToken,
  Otp.validateOtp,
  AuthController.generateToken,
  async (req, res) => {
    res.send({
      hasError: false,
      message: 'otp validate successfully',
      token: req.token,
    });
  }
);

module.exports = router;
