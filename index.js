require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./routes/user.route");

const port = process.env.PORT || 5000;
app.use(express.json());

// User routes
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log("Example app listening on port .... ");
});
