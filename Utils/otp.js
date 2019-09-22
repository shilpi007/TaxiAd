const { OtpModel, CompanyModel, CampaignModel } = require('../Models');
const randomInt = async () => {
  return Math.floor(Math.random() * (999999 - 100000) + 100000);
};

const generateOtp = async (req, res, next) => {
  const { role, contactNo } = req.body;
  if (role === 'Company') {
    console.log(contactNo);
    const Company = await CompanyModel.findOne({ contactPersonContactNo: contactNo });
    console.log(Company);
    if (Company) {
      const key = await randomInt();
      req.smsData = {
        name: Company.contactPersonName,
        otp: key,
        contactNo: Company.contactPersonContactNo,
      };
      const newOtp = new OtpModel({
        userId: Company.contactPersonContactNo,
        role: 'Company',
        otp: key,
      });
      await newOtp.save();
      req.tokenData = {
        id: newOtp._id,
        role: 'Company',
      };
      next();
    } else {
      res.status(403);
      next(new Error('please enter correct number'));
    }
  } else if (role === 'Campaign') {
    const Campaign = await CampaignModel.findOne({ contactPersonContactNo: contactNo });
    if (Campaign) {
      const key = await randomInt();
      req.smsData = {
        name: Campaign.contactPersonName,
        otp: key,
        contactNo: Campaign.contactPersonContactNo,
      };
      const newOtp = new OtpModel({
        userId: Campaign.contactPersonContactNo,
        role: 'Campaign',
        otp: key,
      });
      req.tokenData = {
        userId: newOtp._id,
        role: 'Campaign',
      };
      await newOtp.save();
      next();
    } else {
      res.status(403);
      next(new Error('please enter correct number'));
    }
  } else {
    next(new Error('role is not defined'));
  }
};

const validateOtp = async (req, res, next) => {
  const { id,role } = req;
  const { otp, contactNo } = req.body;
  console.log("id",id)
  console.log("role",role)
  console.log("otp",otp)
  console.log("contactNo",contactNo)
  const Otp = await OtpModel.findById(id);
  console.log(Otp);
  if (Otp) {
    if (otp === Otp.otp && Otp.userId === contactNo) {
      if (role === 'Company') {
        console.log('here1')
        const Company = await CompanyModel.findOne({ contactPersonContactNo: Otp.userId });
        console.log(Company)
        req.tokenData = {
          id: Company._id,
          role: 'Company',
        };
        console.log(req.tokenData);
        next();
      } else if (role === 'Campaign') {
        // const Campaign = await CampaignModel.findOne({contactPer})
      } else {
        req.status(403);
        next(new Error('role is not matched'));
      }
    } else {
      res.status(403);
      next(new Error('otp not matched'));
    }
  } else {
    res.status(403);
    next(new Error('otp not matched'));
  }
};

module.exports = {
  generateOtp,
  validateOtp,
};
