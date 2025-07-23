const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to db " + connection.connection.host);
  } catch (error) {
    console.log("DB errro ", error);
    throw new error();
  }
};

module.exports = dbConnection;
