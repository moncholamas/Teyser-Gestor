const { validationResult } = require('express-validator');
const status = require('../config/constants/status');
const message = require('../config/constants/message');
const throwError = require('../utils/throwError');

// verify all previous validations
function validator(req, res, next) {
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return throwError(status.BAD_REQUEST, message.NOT_FOUND, errorValidation.array());
  }
  return next();
}

module.exports = {
  validator
};