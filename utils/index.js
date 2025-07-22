const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const isUserExist = (users, userEmail) => {
  return users.find((el) => el.email === userEmail);
};

const generateJwtToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET || "secret", {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });
};

module.exports = {
  comparePassword,
  getHashedPassword,
  generateJwtToken,
  isUserExist,
};
