const { AdminModel, CampaignModel, CompanyModel, DriverModel, CampaignDriverMapModel } = require('../Models');
const bcrypt = require('bcryptjs');
const addAdmin = async (req, res, next) => {
  try {
    const adminData = {
      name: 'Admin',
      email: 'admin@taxiad.com',
      password: 'admin123',
    };
    const newAdmin = new AdminModel(adminData);
    await newAdmin.save();
    res.status(200).send({
      hasError: false,
      message: 'admin added successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getToken = async (req, res, next) => {
  try {
    const Admin = await AdminModel.findOne({});
    const tokenData = {
      id: Admin._id,
      role: Admin.role,
    };
    req.tokenData = tokenData;
    next();
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const Admin = await AdminModel.findOne({ email: email });
    if (Admin) {
      const match = await bcrypt.compare(password.trim(), Admin.password);
      if (match) {
        req.tokenData = {
          id: Admin._id,
          role: 'Admin',
        };
        next();
      } else {
        res.status(403);
        next(new Error('unauthorized access..'));
      }
    } else {
      res.status(403);
      next(new Error('unauthorized access..'));
    }
  } catch (e) {
    next(e);
  }
};

const getDashboard = async (req, res, next) => {};

module.exports = {
  addAdmin,
  getToken,
  signIn,
};
