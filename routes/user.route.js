const express = require("express");
const userRouter = express.Router();
const registerBodyValidation = require("../middlewares/register-validation.middleware");
const signInBodyValidation = require("../middlewares/signin.middleware");
const authentication = require("../middlewares/auth-middleware");
const updatePasswordValidation = require("../middlewares/update-password-validation.middleware");

const {
  registerUser,
  signIn,
  updatePassword,
  logOut,
  getAllUsers,
} = require("../controllers/user.controller");

userRouter.get("/all", getAllUsers);

userRouter.post("/register", registerBodyValidation, registerUser);

userRouter.post("/signin", signInBodyValidation, signIn);

userRouter.patch(
  "/update-password",
  updatePasswordValidation,
  authentication,
  updatePassword
);

userRouter.get("/logout", authentication, logOut);

module.exports = userRouter;
