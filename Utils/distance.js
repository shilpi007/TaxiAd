const { CampaignDriverMapModel, CampaignModel } = require('../Models');
const mongoose = require('mongoose');
const randomInt = () => {
  return parseInt(Math.random() * (220 - 180) + 180);
};
const updateDistance = async (req, res, next) => {
  try {
    let Campaign = await CampaignModel.find({ endDate: { $gte: Date.now() } }, { _id: 1 });
    Campaign = Array.from(Campaign, (data) => {
      return mongoose.Types.ObjectId(data._id);
    });
    const CampaignDriverMap = await CampaignDriverMapModel.find({campaignId:{$in:Campaign}});
    for (data of CampaignDriverMap){
      const rand = randomInt();
      data.distanceTravelled.push({date:new Date().toISOString(),distance:rand});
      data.save();
    }
    res.send({
      hasError: false,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  updateDistance,
};
