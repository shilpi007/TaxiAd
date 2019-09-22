const sgMail = require('@sendgrid/mail');
const { scheduleEmail } = require('../Utils/cron');
const { DriverController } = require('../Controllers');
sgMail.setApiKey('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');

sgMail.setSubstitutionWrappers('{{', '}}');

const sendUploadPhotoMail = async (req, res, next) => {
  try {
    const { emailData, token } = req;
    const msg = {
      to: emailData.email,
      from: 'shubham9918sri@gmail.com',
      templateId: 'd-1f834055ae334c7db8f1cc5981919869',
      subject: 'Upload photo',
      dynamic_template_data: {
        name: emailData.name,
        url: `${emailData.url}${token}`,
      },
    };
    await sgMail.send(msg);
    await scheduleEmail(emailData.nextEmailDate, `${process.env.HOST}/api/v1/private/cron/sendMail/${token}`, {
      msg: msg,
      key: process.env.APP_KEY,
    });
    req.photoUploadURL = `${emailData.url}${token}`;
    next();
  } catch (error) {
    next(error);
  }
};

const sendUploadPhotoMailAtEndOfCampaign = async (req, res, next) => {
  try {
    let { msg } = req.body;
    const token = req.token;
    msg.dynamic_template_data.url = `${msg.dynamic_template_data.url.split('=')[0]}=${token}`;
    await sgMail.send(msg);
    res.json({
      hasError: false,
      message: 'driver is successfully add to campaign',
    });
  } catch (error) {
    console.log('mail error', error.message);
    next(error);
  }
};

const sendMailAgainToDriverToUploadPhotos = async (req, res, next) => {
  try {
    const { id, stage, token } = req;
    const Driver = await DriverController.findById(id);
    let msg = {};
    if (Driver) {
      switch (stage) {
        case 1:
        case 4:
          msg = {
            to: Driver.email,
            from: 'shubham9918sri@gmail.com',
            templateId: 'd-1f834055ae334c7db8f1cc5981919869', // templateId of email to notify his photos are approved
            subject: 'Upload photo',
            dynamic_template_data: {
              name: Driver.name,
            },
          };
          await sgMail.send(msg);
          req.driverData = {
            id: Driver._id,
          };
          next();
          break;
        case 2:
        case 5:
          msg = {
            to: Driver.email,
            from: 'shubham9918sri@gmail.com',
            templateId: 'd-1f834055ae334c7db8f1cc5981919869',
            subject: 'Upload photo',
            dynamic_template_data: {
              name: Driver.name,
              url: `${process.env.HOST}/api/v1/driver/add/photos?token=${token}`,
            },
          };
          await sgMail.send(msg);
          res.send({
            hasError: false,
            message: 'driver photos are rejected successfully',
          });
          break;
        default:
          console.log('test');
      }
    } else {
      next(new Error('driver not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendUploadPhotoMail,
  sendUploadPhotoMailAtEndOfCampaign,
  sendMailAgainToDriverToUploadPhotos,
};
