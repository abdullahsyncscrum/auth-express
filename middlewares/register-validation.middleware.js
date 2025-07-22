const { body } = require("express-validator")

const registerBodyValidation = [ body("username").notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .trim() ,body('email').isEmail().withMessage('Invalid email address'),
body('password').isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 characters')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage('Password must contain at least one letter, one number, and one special character')
]


module.exports = registerBodyValidation