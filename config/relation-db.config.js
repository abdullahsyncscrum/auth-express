module.exports = {
  HOST: "localhost",
  USER: "your_pg_user",
  PASSWORD: "your_pg_password",
  DB: "your_db_name",
  DIALECT: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
