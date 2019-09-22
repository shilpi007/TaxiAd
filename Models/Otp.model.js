const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Schema = mongoose.Schema;

const Otp = new Schema({
  createdOn: { type: Date, default: new Date().toISOString() },
  isUsed: { type: Number, default: 0 },
  role: { type: String, required: true },
  userId: { type: String},
  otp: { type: String, required: true },
});

Otp.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'createdOn', 'isUsed', 'role', 'userId', 'otp']);
};

// Otp.pre('save', async function(next) {
//   let user = this;
//   if (user.isModified('otp')) {
//     const salt = await bcrypt.genSaltSync(10);
//     const hash = await bcrypt.hashSync(user.otp, salt);
//     console.log('otp', hash);
//     user.otp = hash;
//     next();
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model('Otp', Otp);
