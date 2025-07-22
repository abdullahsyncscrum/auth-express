



const express = require("express")
const userRouter = express.Router()

const { validationResult } = require("express-validator");
const registerBodyValidation = require("../middlewares/register-validation.middleware");
const signInBodyValidation = require("../middlewares/signin.middleware");
const generateJwtToken = require("../utils/generate-jwt");
const authentication = require("../middlewares/auth");
const getHashedPassword = require("../utils/hashed-password");
const isUserExist = require("../utils/user-exist");
const updatePasswordValidation = require("../middlewares/update-password-validation.middleware");
const comparePassword = require("../utils/compare-password");


const Users = require("../model/user.model")




userRouter.post('/register', registerBodyValidation , async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;


  if(isUserExist(Users.users, email)) {
    return res.status(400).json({ message: 'User with this email already exist!' });
  }

  const hashedPassword = await getHashedPassword(password);

  Users.users.push({username, email, password: hashedPassword });

  const token = await generateJwtToken(email);

  return res.status(201).json({ message: 'User registered successfully!', token });
});


userRouter.post("/signin", signInBodyValidation, async (req, res, next) => {
 // Check for validation errors
  const errors = validationResult(req);
   if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }


  // Is user exist with this email or not
  if(!isUserExist(Users.users, req.body.email)) {
    return res.status(400).json({ message: 'User with this email not exist!' });
  }

  const token = await generateJwtToken(req.body.email);


  return res.status(200).json({ message: 'Signin successfully', token });



});


userRouter.patch("/update-password", updatePasswordValidation, authentication ,async (req, res) => {

      // Check for validation errors
  const errors = validationResult(req);



  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });
  }

  const {email, oldPassword, newPassword} = req.body;

  const user = isUserExist(Users.users, email);

  if(!user) {
    return res.status(400).json({message: "User with this email is not registerd"});
  }

  

  if(!comparePassword(oldPassword, user.password)) {
    return res.status(400).json({message: "Please provide a valid password"});
  } 



  const hashedPassword = await getHashedPassword(newPassword);

  user.password = hashedPassword;


  return res.status(200).json("Password is updated successfully!");


})


userRouter.get("/logout", authentication, (req, res) => {
  return  res.status(200).json({ message: 'Logout successfully', token: null });  
})


module.exports = userRouter