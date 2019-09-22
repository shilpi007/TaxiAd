const { mongoConnect } = require('./dbConfig');
const  { upload } = require('./multerConfig');
const {errorLogger, infoLogger} = require('./morganConfig');
module.exports = {
  mongoConnect,
  errorLogger,
  infoLogger,
  upload,
};
