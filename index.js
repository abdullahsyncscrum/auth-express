require('dotenv').config(); 
const express = require("express");
const app = express();

const userRouter = require("./routes/user.route");

const port = process.env.PORT || 5000; 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send("Hi am an express server!");
})



// User routes

app.use("/api/vi/user", userRouter);





app.listen(port,  () => {
  console.log("Example app listening on port .... ");
})


