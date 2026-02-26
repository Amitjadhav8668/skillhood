const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation error',
      errors: errors.array() 
    });
  }
  next();
};

// Register validation
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
  body('city').trim().notEmpty().withMessage('City is required'),
  validate
];

// Login validation
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

// Skill validation
const skillValidation = [
  body('name').trim().notEmpty().withMessage('Skill name is required')
    .isLength({ max: 100 }).withMessage('Skill name too long'),
  body('type').isIn(['offer', 'want']).withMessage('Type must be offer or want'),
  validate
];

// Message validation
const messageValidation = [
  body('message').trim().notEmpty().withMessage('Message cannot be empty')
    .isLength({ max: 1000 }).withMessage('Message too long'),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  skillValidation,
  messageValidation
};
