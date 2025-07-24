require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./middlewares/error.middleware");
const connectToDB = require("./config/db.config");
const app = express();

const userRouter = require("./routes/user.route");

const PORT = process.env.PORT || 5000;
app.use(express.json());

// User routes
app.use("/api/v1/user", userRouter);

// Handle errors

app.use(errorMiddleware);

connectToDB()
  .then(() => {
    app.listen(PORT, () => console.log(`App is running on ${PORT}`));
  })
  .catch((err) => {
    console.log(`An error occurs while connectiong to DB `, err);
  });
