const mongoose = require("mongoose");
const db = require("../model/relational-database/index");

const connectToDB = async () => {
  try {
    if (process.env.DB_TYPE === "Postgress") {
      await db.sequelize.sync();
    } else {
      await mongoose.connect(process.env.MONGO_URI);
    }
  } catch (error) {
    throw new error();
  }
};

module.exports = connectToDB;
