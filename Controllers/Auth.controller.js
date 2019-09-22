const jwt = require('jsonwebtoken');

const generateToken = async (req, res, next) => {
  try {
    const { tokenData } = req;
    const iat = Math.floor(Date.now() / 1000);
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;
    const token = await jwt.sign(
      { iat: iat, exp: exp, data: tokenData },
      process.env.SECRET_KEY || 'ksdd83ywhsh9ewsfn'
    );
    req.token = token;
    next();
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  let token = req.headers['Authorization'] || req.headers['authorization'] || req.params.token || req.query.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY || 'ksdd83ywhsh9ewsfn', async (err, decoded) => {
      if (err) {
        res.status(403);
        next(new Error('Unauthorized access'));
      } else {
        const iat = Math.floor(Date.now() / 1000);
        const exp = Math.floor(Date.now() / 1000) + 60 * 60;
        const token = await jwt.sign(
            { iat: iat, exp: exp, data: {id:decoded.id,role:decoded.role} },
            process.env.SECRET_KEY || 'ksdd83ywhsh9ewsfn'
        );
        req.token = token;
        req.id = decoded.data.id;
        req.role = decoded.data.role;
        console.log(token);
        next(); 
      }
    });
  } else {
    res.status(400);
    next(new Error('Authorization token is not passed'));
  }
};

const validateToken = async (req, res, next) => {
  let token = req.headers['Authorization'] || req.headers['authorization'] || req.params.token || req.query.token;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY || 'ksdd83ywhsh9ewsfn', (err, decoded) => {
      if (err) {
        res.status(401);
        next(new Error('Unauthorized access'));
      } else {
        console.log(decoded)
        req = Object.assign(req, decoded.data);
        next();
      }
    });
  } else {
    res.status(400);
    next(new Error('Authorization token is not passed'));
  }
};

const keyFilter = async (req, res, next) => {
  try {
    if (req.body.key === process.env.APP_KEY) {
      next();
    } else {
      res.status(403);
      next(new Error('unauthorized access'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateToken,
  validateToken,
  keyFilter,
  refreshToken,
};
