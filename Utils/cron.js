const { scheduleJob, RecurrenceRule } = require('node-schedule');
const axios = require('axios');

const scheduleEmail = async (date, url, data) => {
  scheduleJob(date, () => {
    axios
      .post(url, data)
      .then((res) => {
        console.log('success');
      })
      .catch((error) => {
        console.log('error:', error.message);
      });
  });
};

const updateDistance = () => {
  try {
    const role = new RecurrenceRule();
    role.second  = 1;
    console.log('job is scheduled');
    scheduleJob(role, async () => {
      console.log('job is called');
      try {
        await axios.post(process.env.PRIVATE_URL_UPDATE_DISTANCE, { key: process.env.APP_KEY });
      } catch (e) {}
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  scheduleEmail,
  updateDistance,
};
