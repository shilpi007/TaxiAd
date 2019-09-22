const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Schema = mongoose.Schema;

const CampaignDriverMapSchema = new Schema({
  addedOn: { type: Date, default: new Date().toISOString() },
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaigns' },
  driverId: { type: Schema.Types.ObjectId, ref: 'Drivers' },
  stage: { type: Number, default: 0 },
  distanceTravelled: { type: Array, default: [] },
  start: {
    date: { type: Date, default: null },
    photos: { type: Array, default: [] },
  },
  end: {
    date: { type: Date, default: null },
    photos: { type: Array, default: [] },
  },
});

CampaignDriverMapSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'addedOn', 'campaignId', 'driverId', 'stage', 'start', 'end']);
};

module.exports = mongoose.model('CampaignDriverMap', CampaignDriverMapSchema);
