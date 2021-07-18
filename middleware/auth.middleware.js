const httpContext = require('express-http-context');

const jwt = require('jsonwebtoken');
const logger = require('../services/logger')(module);

const config = require('../config');



module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({message: "Not authorized"});
    };

    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    logger.error('Not authorized');
    res.status(401).json({message: "Not authorized"});
  }
};
