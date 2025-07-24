const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("DB errro ", error);
    throw new error();
  }
};

module.exports = dbConnection;
