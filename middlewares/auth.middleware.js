const jwt = require("jsonwebtoken");

const User = require("../model/user.model");
const db = require("../model/relational-database/index");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  let user;
  if (process.env.DB_TYPE === "Postgress") {
    user = await db.User.findOne({
      where: { jwtToken: token },
    });
  } else {
    user = await User.findOne({ jwtToken: token });
  }

  if (!user) {
    return res.status(400).json({ error: "Incorrect Jwt token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ error: JSON.stringify(err) });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authentication;
