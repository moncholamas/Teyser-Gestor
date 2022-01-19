const { check } = require('express-validator');
const { validator } = require('../validator');

// array of general validation
const validateAuth = [
  check('mail').notEmpty().withMessage('mail fail'),
  check('password').notEmpty().withMessage('pass fail'),

  (req, res, next) => {
    validator(req, res, next);
  }
];


module.exports = {
  validateAuth
};
