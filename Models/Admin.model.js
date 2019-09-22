const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  createdOn: { type: Date, default: new Date().toISOString() },
  updatedOn: { type: Date, default: new Date().toISOString() },
  lastLogin: { type: Date, default: new Date().toISOString() },
  name: { type: String, required: 'Name is required' },
  email: { type: String, required: 'Email is required' },
  password: { type: String, required: 'Password is required' },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: 'Admin' },
});
AdminSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'firstName', 'lastName', 'lastLogin', 'email', 'role']);
};

AdminSchema.pre('save', async function(next) {
  let user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(user.password, salt);
    console.log('passowrd', hash);
    user.password = hash;
    next();
  } else {
    next();
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
