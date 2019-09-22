const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  createdOn: { type: Date, default: new Date().toISOString() },
  updatedOn: { type: Date, default: new Date().toISOString() },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  name: { type: String, required: 'Name is required' },
  contactNo: { type: String, required: 'Contact No. is required', unique: true },
  email: { type: String, unique: true },
  carNo: { type: String, required: 'Car No. is required' },
  distanceTravelled: { type: Number, default: 0 },
  city: { type: String, required: 'City is required' },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: 'Driver' },
  bankAccNo: { type: String, required: 'Bank Account No. is required', unique: true },
  bankIFSC: { type: String, required: 'Bank IFSC is required' },
  state: { type: Number, default: 0 },
  isInCampaign: { type: Boolean, default: false },
  isEngaged: { type: Boolean, default: false },
});

DriverSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, [
    '_id',
    'createdOn',
    'createdBy',
    'name',
    'contactNo',
    'email',
    'carNo',
    'distanceTravelled',
    'city',
    'role',
    'bankAccNo',
    'bankIFSC',
    'state',
    'isInCampaign',
  ]);
};

module.exports = mongoose.model('Drivers', DriverSchema);
