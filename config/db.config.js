const mongoose = require("mongoose");
const db = require("../model/relational-database/index");

const connectToDB = async () => {
  try {
    console.log("Connecting to DB with URI:", process.env.PG_URI);

    if (process.env.DB_TYPE === "Postgres") {
      const connection = await db.sequelize.sync();
      console.log(
        "Connection to MySQL ->>>>>>>>>>> >>>> >>>> >>> > ",
        connection
      );
    } else {
      await mongoose.connect(process.env.MONGO_URI);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectToDB;
