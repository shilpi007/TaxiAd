const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  createdOn: { type: Date, default: new Date().toISOString() },
  updatedOn: { type: Date, default: new Date().toISOString() },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  name: { type: String, required: 'Name is required' },
  contactPersonName: { type: String, required: 'Name is required' },
  contactPersonEmail: { type: String, required: 'Email is required' },
  contactPersonContactNo: { type: String, required: 'Contact No. is required' },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: 'Company' },
});

CompanySchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, [
    '_id',
    'createdOn',
    'createdBy',
    'name',
    'contactPersonName',
    'contactPersonEmail',
    'contactPersonContactNo',
    'role',
  ]);
};

module.exports = mongoose.model('Companies', CompanySchema);
