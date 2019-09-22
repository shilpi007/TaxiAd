const logger = require('morgan');
const fs = require('fs');
const path = require('path');

const logString = ':method :url :status :res[content-length] - :response-time ms \nReqData:reqBody';
const successLogStream = fs.createWriteStream(path.join(process.env.ROOT_DIR, '/logs', 'success.log'), { flags: 'w' });
const errorLogStream = fs.createWriteStream(path.join(process.env.ROOT_DIR, '/logs', 'error.log'), { flags: 'w' });

logger.token('reqBody', (req) => {
  if (req.method === 'GET') {
    return JSON.stringify(req.query || {}, null, 2);
  } else {
    return JSON.stringify(req.body || {}, null, 2);
  }
});

const errorLogger = logger('error ' + logString, {
  skip: function(req, res) {
    return res.statusCode < 400;
  },
  stream: errorLogStream,
});

const infoLogger = logger('info ' + logString, {
  skip: function(req, res) {
    return res.statusCode >= 400;
  },
  stream: successLogStream,
});


module.exports = {
  errorLogger,
  infoLogger,
};
