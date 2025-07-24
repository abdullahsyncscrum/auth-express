const express = require("express");
const userRouter = express.Router();
const registerBodyValidation = require("../middlewares/register-validation.middleware");
const signInBodyValidation = require("../middlewares/signin.middleware");
const authentication = require("../middlewares/auth.middleware");
const updatePasswordValidation = require("../middlewares/update-password-validation.middleware");
const payloadErrorHandler = require("../middlewares/validate-body.middleware");

const {
  registerUser,
  signIn,
  updatePassword,
  logOut,
  getAllUsers,
} = require("../controllers/user.controller");

userRouter.get("/all", getAllUsers);

userRouter.post(
  "/register",
  registerBodyValidation,
  payloadErrorHandler,
  registerUser
);

userRouter.post("/signin", signInBodyValidation, payloadErrorHandler, signIn);

userRouter.patch(
  "/update-password",
  updatePasswordValidation,
  payloadErrorHandler,
  authentication,
  updatePassword
);

userRouter.get("/logout", authentication, logOut);

module.exports = userRouter;
