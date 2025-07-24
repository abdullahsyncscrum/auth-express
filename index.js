require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();

const userRouter = require("./routes/user.route");

const PORT = process.env.PORT || 5000;
app.use(express.json());

// User routes
app.use("/api/v1/user", userRouter);

// Handle errors

app.use(errorMiddleware);

if (process.env.DB_TYPE === "Postgress") {
  const db = require("./model/relational-database/index");
  db.sequelize
    .sync()
    .then(() => {
      console.log("Database synced.");
      app.listen(PORT, () => {
        console.log("Server is running on " + PORT);
      });
    })
    .catch((err) => {
      console.log("Failed to sync db:", err);
    });
} else {
  const dbConnection = require("./config/db.config");
  dbConnection()
    .then((res) => {
      app.listen(PORT, () => {
        console.log("Server is running on " + PORT);
      });
    })
    .catch((err) => {
      console.log("db ", err);
    });
}
