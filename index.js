require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/db.config");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();

const userRouter = require("./routes/user.route");

const PORT = process.env.PORT || 5000;
app.use(express.json());

// User routes
app.use("/api/v1/user", userRouter);

// Handle errors

app.use(errorMiddleware);

dbConnection()
  .then((res) => {
    app.listen(PORT, () => {
      console.log("Server is running on " + PORT);
    });
  })
  .catch((err) => {
    console.log("db ", err);
  });
