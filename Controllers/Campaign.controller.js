// import module
const { AdminModel, CampaignModel, CompanyModel, CampaignDriverMapModel } = require('../Models');
const mongoose = require('mongoose');

const addCampaign = async (req, res, next) => {
  try {
    const { body } = req;
    const newCampaign = new CampaignModel(body);
    const company = await CompanyModel.findById(body.companyId);
    if (company) {
      const admin = await AdminModel.findOne({});
      newCampaign.createdBy = admin._id;
      newCampaign.companyId = company._id;
      await newCampaign.save();
      res.status(200).send({
        hasError: false,
        message: 'campaign successfully added',
        data: newCampaign,
      });
    } else {
      res.status(400);
      next(new Error('campaign not found'));
    }
  } catch (error) {
    next(error);
  }
};

const allCampaignsList = async (req, res, next) => {
  try {
    const { id, role } = req;
    // const Company = await CompanyModel.findById(id);
    let requestAllCampaignsList;
    if (role === 'Company') {
      requestAllCampaignsList = [
        { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company' } },
        { $unwind: '$company' },
        { $match: { 'company._id': mongoose.Types.ObjectId(id) } },
        {
          $project: {
            name: 1,
            contactPersonName: 1,
            contactPersonEmail: 1,
            contactPersonContactNo: 1,
            'company.name': 1,
            'company._id': 1,
          },
        },
      ];
      let allCampaignList = await CampaignModel.aggregate(requestAllCampaignsList);
      res.send({
        hasError: false,
        message: 'all campaign list',
        data: allCampaignList,
      });
    } else {
      console.log('here');
      requestAllCampaignsList = [
        { $lookup: { from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company' } },
        { $unwind: '$company' },
        {
          $project: {
            name: 1,
            contactPersonName: 1,
            contactPersonEmail: 1,
            contactPersonContactNo: 1,
            'company.name': 1,
          },
        },
      ];
      const allCampaignList = await CampaignModel.aggregate(requestAllCampaignsList);
      res.send({
        hasError: false,
        message: 'all campaign list',
        data: allCampaignList,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const campaignListByCity = async (req, res, next) => {
  try {
    const { city } = req.body;
    const requestCampaignListByCity = [{ $match: { city: city } }, { $project: { name: 1 } }];
    const campaignListByCity = await CampaignModel.aggregate(requestCampaignListByCity);
    res.send({
      hasError: false,
      message: 'campaign list by city',
      data: campaignListByCity,
    });
  } catch (error) {
    next(error);
  }
};

const getCampaignListById = async (req, res, next) => {
  try {
    const { id } = req;
    const requestCampaignListById = [{ $match: { companyId: mongoose.Types.ObjectId(id) } }, { $project: { name: 1 } }];
    let campaignListById = await CampaignModel.aggregate(requestCampaignListById);
    campaignListById = Array.from(campaignListById, (data) => {
      return { label: data.name, value: data._id };
    });
    console.log(campaignListById)
    res.send({
      hasError: false,
      message: 'campaign list by city',
      data: campaignListById,
    });
  } catch (error) {
    next(error);
  }
};

const campaignDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    const driverData = await CampaignDriverMapModel.aggregate([
      { $lookup: { from: 'drivers', localField: 'driverId', foreignField: '_id', as: 'drivers' } },
      { $unwind: '$drivers' },
      { $match: { campaignId: mongoose.Types.ObjectId(id) } },
      {
        $project: {
          'drivers._id': 1,
          'drivers.name': 1,
          'drivers.contactNo': 1,
          'drivers.email': 1,
          'drivers.carNo': 1,
          'drivers.city': 1,
        },
      },
    ]);
    const driverList = Array.from(driverData, (data) => {
      return data.drivers;
    });
    res.send({
      hasError: false,
      message: 'campaign detail',
      data: driverList,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const distanceTraveled = async (req, res, next) => {
  try {
    const { id } = req.body;
    const distanceData = await CampaignDriverMapModel.aggregate([
      { $match: { campaignId: mongoose.Types.ObjectId(id) } },
      { $project: { distanceTravelled: 1 } },
    ]);
    let graphData = {};
    for (let data of distanceData) {
      data.distanceTravelled.forEach((temp) => {
        if (typeof graphData[temp.date] === 'undefined') {
          graphData[temp.date] = temp.distance;
        } else {
          graphData[temp.date] += temp.distance;
        }
      });
    }
    res.send({
      hasError: false,
      message: 'graph data',
      data: graphData,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addCampaign,
  allCampaignsList,
  campaignListByCity,
  campaignDetails,
  getCampaignListById,
  distanceTraveled,
};
