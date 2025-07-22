const { validationResult } = require("express-validator");
const { generateJwtToken } = require("../utils");
const { getHashedPassword } = require("../utils");
const { isUserExist } = require("../utils");
const { comparePassword } = require("../utils");

const Users = require("../model/user.model");

const getAllUsers = (req, res) => {
  return res.status(200).json({ users: Users.users });
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  if (isUserExist(Users.users, email)) {
    return res
      .status(400)
      .json({ message: "User with this email already exist!" });
  }

  const hashedPassword = await getHashedPassword(password);

  Users.users.push({ username, email, password: hashedPassword });

  return res.status(201).json({
    message: "User registered successfully!",
  });
};

const signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = isUserExist(Users.users, req.body.email);

  if (!user) {
    return res.status(400).json({ message: "User with this email not exist!" });
  }

  const isPasswordMatched = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Please provide a valid password" });
  }

  return res.status(200).json({
    message: "Signin successfully",
    token: generateJwtToken(req.body.email),
  });
};

const updatePassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, oldPassword, newPassword } = req.body;

  const user = isUserExist(Users.users, email);

  if (!user) {
    return res
      .status(400)
      .json({ message: "User with this email is not registerd" });
  }

  const isPasswordMatched = await comparePassword(oldPassword, user.password);

  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Please provide a valid password" });
  }

  const hashedPassword = await getHashedPassword(newPassword);

  user.password = hashedPassword;

  return res.status(200).json({ message: "Password is updated successfully!" });
};

const logOut = (req, res) => {
  return res.status(200).json({ message: "Logout successfully", token: null });
};

module.exports = {
  registerUser,
  signIn,
  updatePassword,
  logOut,
  getAllUsers,
};
