const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    jwtToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
