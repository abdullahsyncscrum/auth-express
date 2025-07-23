const { generateJwtToken } = require("../utils");
const { getHashedPassword } = require("../utils");
const { comparePassword } = require("../utils");
const User = require("../model/user.model");

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  return res.status(200).json({ message: "Users fetched successfully", users });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    return res
      .status(400)
      .json({ message: "User with this email already exists!" });
  }

  const hashedPassword = await getHashedPassword(password);

  try {
    const newUser = new User({ email, password: hashedPassword, username });
    const savedUser = await newUser.save();

    savedUser.password = undefined;

    return res.status(201).json({
      message: "User registered successfully!",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error || "There is some server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { jwtToken: generateJwtToken(email) },
    { new: true }
  ).select("+password");

  if (!user) {
    return res.status(400).json({ message: "User with this email not exist!" });
  }

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Please provide a valid password" });
  }

  user.password = undefined;

  return res.status(200).json({
    message: "Signin successfully",
    user,
  });
};

const updatePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email: email }).select("+password");

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

  try {
    user.password = hashedPassword;

    await user.save();

    return res
      .status(200)
      .json({ message: "Password is updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error || "There is some server error" });
  }
};

const logOut = async (req, res) => {
  const { email } = req.user;
  await User.findOneAndUpdate({ email }, { jwtToken: null });

  return res.status(200).json({ message: "User logout successfully" });
};

module.exports = {
  registerUser,
  signIn,
  updatePassword,
  logOut,
  getAllUsers,
};
