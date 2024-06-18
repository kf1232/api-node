const config = require('config');

const httpsPort = config.get('app.httpsPort');

const redirectHttpToHttps = (req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host.split(':')[0]}:${httpsPort}${req.url}`);
};

module.exports = redirectHttpToHttps;
