const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
 
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  createdOn: { type: Date, default: new Date().toISOString() },
  updatedOn: { type: Date, default: new Date().toISOString() },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  companyId: { type: Schema.Types.ObjectId, ref: 'Companies' },
  name: { type: String, required: 'Name is required' },
  contactPersonName: { type: String, required: 'Name is required' },
  contactPersonEmail: { type: String, required: 'Email is required' },
  contactPersonContactNo: { type: String, required: 'Contact No. is required' },
  startDate: { type: Date, required: 'Start Date is requires' },
  endDate: { type: Date, required: 'End Date is required' },
  city: { type: String, required: 'City is required' },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: 'Driver' },
});

CampaignSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, [
    '_id',
    'createdOn',
    'createdBy',
    'companyId',
    'name',
    'contactPersonName',
    'contactPersonEmail',
    'contactPersonContactNo',
    'startDate',
    'endDate',
    'city',
    'role',
  ]);
};

module.exports = mongoose.model('Campaigns', CampaignSchema);
