const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: "postgres",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);

module.exports = db;
