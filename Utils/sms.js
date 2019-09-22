const axios = require('axios');

const sendMessageOnDriverAddToCampaign = async (req, res, next) => {
  try {
    const profileId = process.env.SMS_SENDER_PROFILE_ID;
    const apiKey = process.env.SMS_API_KEY;
    const senderId = process.env.SMS_SENDER_ID;
    const mobileNo = req.driverData.contactNo;
    const driverName = req.driverData.name;
    const campaignName = req.campaignData.name;
    const URL = req.photoUploadURL;
    const textMessage = `Hello ${driverName}, you are successfully added to ${campaignName} campaign. Please upload photos at ${URL}`;
    const responce = await axios.get(
      `http://5.189.149.16/api/pushsms.php?user=${profileId}&key=${apiKey}&sender=${senderId}&mobile=${mobileNo}&text=${textMessage}`
    );
    res.send({
      hasError: false,
      message: 'driver is successfully added to campaign',
    });
    console.log(textMessage);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const sendMessageOnAdminActionOnDriver = async (req, res, next) => {
  try {
    const profileId = process.env.SMS_SENDER_PROFILE_ID;
    const apiKey = process.env.SMS_API_KEY;
    const senderId = process.env.SMS_SENDER_ID;
    const mobileNo = req.driverData.contactNo;
    const driverName = req.driverData.name;
    const status = req.driverData.state === 1?'accepted':'rejected';
    const textMessage = `Hello ${driverName}, your request is ${status} by admin`;
    const responce = await axios.get(
      `http://5.189.149.16/api/pushsms.php?user=${profileId}&key=${apiKey}&sender=${senderId}&mobile=${mobileNo}&text=${textMessage}`
    );
    res.send({
      hasError: false,
      message: 'driver is successfully added to campaign',
    });
    console.log(textMessage);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const sendOtp = async (req, res, next) => {
  try {
    const profileId = process.env.SMS_SENDER_PROFILE_ID;
    const apiKey = process.env.SMS_API_KEY;
    const senderId = process.env.SMS_SENDER_ID;
    const {name, otp, contactNo} = req.smsData;
    const textMessage = `Hello ${name}, your opt is ${otp}, do not share it with other one.`;
    const responce = await axios.get(
        `http://5.189.149.16/api/pushsms.php?user=${profileId}&key=${apiKey}&sender=${senderId}&mobile=${contactNo}&text=${textMessage}`
    );
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = {
  sendMessageOnDriverAddToCampaign,
  sendMessageOnAdminActionOnDriver,
  sendOtp,
};
