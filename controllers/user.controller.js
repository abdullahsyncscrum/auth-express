const { generateJwtToken } = require("../utils");
const { getHashedPassword } = require("../utils");
const { comparePassword } = require("../utils");
const DatabaseService = require("../services/base-database.service");
const UserRepository = require("../repositories/user.repository");

let dbSchema = null;
if (process.env.DB_TYPE === "Postgres") {
  const db = require("../model/relational-database/index");
  const PostgressService = require("../services/base-postgres.service");
  dbSchema = new PostgressService(db.User);
} else {
  const User = require("../model/user.model");
  const MongoDbService = require("../services/base-mongodb.service");
  dbSchema = new MongoDbService(User);
}

const databaseService = new DatabaseService(dbSchema);
const userRepository = new UserRepository(databaseService);

const getAllUsers = async (req, res) => {
  const users = await userRepository.findAllUsers();

  return res.status(200).json({
    message: "User fetched successfully ",
    users,
  });
};

const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await userRepository.findOneWithOutPassword(email);

    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists!" });
    }

    const hashedPassword = await getHashedPassword(password);

    const newUser = await userRepository.createUser({
      email,
      password: hashedPassword,
      username,
    });

    newUser.password = undefined;

    return res.status(201).json({
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findOneWithPassword(email);

    if (!user) {
      return res.status(400).json({ error: "User with this email not exist!" });
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Please provide a valid password" });
    }

    const token = generateJwtToken(email);

    user.jwtToken = token;

    user.password = undefined;

    await user.save();

    return res.status(200).json({
      message: "Signin successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await userRepository.findOneWithPassword(email);

    if (!user) {
      return res
        .status(400)
        .json({ error: "User with this email is not registerd" });
    }

    const isPasswordMatched = await comparePassword(oldPassword, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Please provide a valid password" });
    }

    const hashedPassword = await getHashedPassword(newPassword);
    user.password = hashedPassword;

    try {
      await user.save();

      return res
        .status(200)
        .json({ message: "Password is updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: error || "There is some server error" });
    }
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await userRepository.findByEmailAndUpdate(email, {
      jwtToken: null,
    });

    if (!user) return;

    return res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  signIn,
  updatePassword,
  logOut,
  getAllUsers,
};
