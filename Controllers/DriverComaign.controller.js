const { CampaignModel, DriverModel, CampaignDriverMapModel } = require('../Models');

const addDriverToCampaign = async (req, res, next) => {
  try {
    const { driverId, campaignId } = req.body;
    const driverNotInAnyCampaign = await DriverModel.findOne({ _id: driverId, state: 1, isInCampaign: false });
    const Campaign = await CampaignModel.findById(campaignId);
    if (driverNotInAnyCampaign && Campaign) {
      const newCampaignDriverMap = new CampaignDriverMapModel({ driverId, campaignId });
      await newCampaignDriverMap.save();
      driverNotInAnyCampaign.isInCampaign = true;
      driverNotInAnyCampaign.isEngaged = true;
      await driverNotInAnyCampaign.save();
      req.tokenData = {
        id: driverNotInAnyCampaign._id,
        campaignId: campaignId,
        role: 'photoUpload',
      };
      req.emailData = {
        email: driverNotInAnyCampaign.email,
        name: driverNotInAnyCampaign.name,
        url: 'http://localhost:5000/api/v1/driver/add/photos?token=',
        nextEmailDate: Campaign.endDate,
      };
      req.driverData = driverNotInAnyCampaign;
      req.campaignData = Campaign;
      next();
    } else {
      res.status(500);
      if (!driverNotInAnyCampaign) {
        next(Error('driver is not found or already in any campaign'));
      } else if (!Campaign) {
        next(Error('no such campaign campaign'));
      } else {
        next(Error('internal server error'));
      }
    }
  } catch (error) {
    next(error);
  }
};

const removeDriverFromCampaign = async (req, res, next) => {
  try {
    if(req.stage === 6){
      const { driverData } = req;
      const Driver = await DriverModel.findById(driverData.id);
      if (Driver) {
        Driver.isInCampaign = false;
        await Driver.save();
        res.send({
          hasError: false,
          message: 'driver get removed from campaign at end',
        });
      } else {
        next(new Error('driver not found'));
      }
    }else{
      res.send({

      })
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDriverToCampaign,
  removeDriverFromCampaign,
};
