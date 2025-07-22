const { body } = require("express-validator");

const updatePasswordValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("oldPassword")
    .isLength({ min: 6, max: 30 })
    .withMessage("Password must be between 6 and 30 characters")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      "Password must contain at least one letter, one number, and one special character"
    ),
  body("newPassword")
    .isLength({ min: 6, max: 30 })
    .withMessage("New password must be between 6 and 30 characters")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      "New password must contain at least one letter, one number, and one special character"
    )
    .custom((newPassword, { req }) => {
      if (newPassword === req.body.oldPassword) {
        throw new Error("New password must be different from the old password");
      }
      return true;
    }),
];

module.exports = updatePasswordValidation;
