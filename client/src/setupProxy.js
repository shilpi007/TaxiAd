const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/v1/company/add', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/driver/add', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/campaign/add', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/company/list/NameAndId', { target: 'http://localhost:5000/' }));

  app.use(proxy('/api/v1/company/list/all', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/driver/list/all', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/campaign/list/all', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/campaign/list/NameAndIdByCity', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/driver/update/state', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/campaign/list/NameAndIdByCity', { target: 'http://localhost:5000/' }));
  
  app.use(proxy('/api/v1/campaign/add/driver', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/admin/signin', { target: 'http://localhost:5000/' }));
  app.use(proxy("/api/v1/otp/validate", { target: 'http://localhost:5000/' }));
  app.use(proxy("/api/v1/otp/generate", { target: 'http://localhost:5000/' }));
  app.use(proxy("/api/v1/campaign/details", { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/campaign/list/NameAndIdById', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/v1/campaign/distanceTravelled', { target: 'http://localhost:5000/' }));

};