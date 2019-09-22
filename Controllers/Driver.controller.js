// import module
const { AdminModel, DriverModel, CampaignDriverMapModel } = require('../Models');

const addDriver = async (req, res, next) => {
  try {
    const { body } = req;
    const newDriver = new DriverModel(body);
    const admin = await AdminModel.findOne({});
    newDriver.createdBy = admin._id;
    await newDriver.save();
    res.status(200).send({
      hasError: false,
      message: 'driver successfully added',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const allDriversList = async (req, res, next) => {
  try {
    const { state } = req.query;
    const requestAllDriversList = [
      { $match: { state: parseInt(state) } },
      { $project: { name: 1, contactNo: 1, carNo: 1, city: 1, isInCampaign: 1 } },
    ];
    const allDriversList = await DriverModel.aggregate(requestAllDriversList);
    console.log(allDriversList);
    res.send({
      hasError: false,
      message: 'all drivers list',
      data: allDriversList,
    });
  } catch (error) {
    next(error);
  }
};

const acceptOrRejectDriver = async (req, res, next) => {
  try {
    const { driverId, state } = req.body;
    const Driver = await DriverModel.findById(driverId);
    if (Driver) {
      Driver.state = state;
      await Driver.save();
      req.driverData = Driver;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};

const approveOrRejectImage = async (req, res, next) => {
  try {
    const { driverId, campaignId, isApproved } = req.body;
    const CampaignDriverMap = await CampaignDriverMapModel.findOne({
      driverId: driverId,
      campaignId: campaignId,
      stage: { $eq: { $or: [1, 2] } },
    });
    if (CampaignDriverMap) {
      if (isApproved) {
        if (CampaignDriverMap.stage === 1) {
          CampaignDriverMap.stage  += 1;
        }
      } else {
        CampaignDriverMap.stage += 2;
      }
      await CampaignDriverMap.save();
      req.stage = CampaignDriverMap.stage;
      req.driverId = CampaignDriverMap.driverId;
      req.tokenData = {
        id:driverId,
        role:'uploadPhotos'
      };
      next();
    } else {
      next(new Error('unable to find driver in campaign'));
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addDriver,
  allDriversList,
  acceptOrRejectDriver,
  approveOrRejectImage,
};
