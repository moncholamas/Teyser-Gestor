const { check } = require('express-validator');
const { validator } = require('./validator');
const message = require('../../config/constants/message')

const authSchema = [
  check('mail').notEmpty().withMessage(message.MAIL_REQUIRED),
  check('password').notEmpty().withMessage(message.PASSWORD_REQUIRED),

  (req, res, next) => {
    validator(req, res, next);
  }
];


const authUpSchema = [
  check('name').notEmpty().withMessage(message.NAME_REQUIRED),
  check('lastName').notEmpty().withMessage(message.LASTNAME_REQUIRED),
  check('mail').notEmpty().withMessage(message.MAIL_REQUIRED),
  check('password').notEmpty().withMessage(message.PASSWORD_REQUIRED),

  (req, res, next) => {
    validator(req, res, next);
  }
];


module.exports = {
  authSchema,
  authUpSchema
};
