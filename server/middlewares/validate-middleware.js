const { check } = require('express-validator');

const validateRegister =[
    check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];


module.exports = validateRegister;