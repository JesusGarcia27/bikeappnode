const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must have at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one capital letter')
    .matches(/[!@#$%^&*(),.?\":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must have at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one capital letter')
    .matches(/[!@#$%^&*(),.?\":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
  validFields,
];

exports.createRepairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Incorrect format, you must put a date'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('Motors number cannot be empty')
    .isLength({ min: 8 })
    .withMessage(
      'The number of your motorcycle must complete a minimum of 8 characteres'
    ),
  body('description').notEmpty().withMessage('Description cannot be empty'),
  validFields,
];
