const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");
require("dotenv").config();
const { check , validationResult } = require('express-validator');

const UserController = {
  registerUser: async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, email, password } = req.body;

      if (!firstName || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields!" });

        }
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
          return res.status(400).json({ message: "Email is already in use!" });
        }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.createUser({
        firstName: firstName,
        email: email,
        password: hashedPassword,
      });
      console.log(newUser);
      return res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error!" });
    }
  },
  loginUser: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please enter your information!" });
      }
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password!" });
      }
      const isMatchPassword = await bcrypt.compare(password, user.password)
      if(!isMatchPassword){
        return res.status(401).json({ message: "Invalid credentials!" });
      }
      const token = jwt.sign({id : user.user_id , email : user.email}, process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN});
      res.cookie("accessToken",  token , { httpOnly: true }).status(200).json({ message : "Login Successfully"});

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error!" });
    }
  },
  setQuitDate: async function (req , res)  {
      const { quitDate } = req.body;
      console.log("req user : ",req.user);
      const userId = req.user.id;
      if (!quitDate || !userId) {
        return res.status(400).json({ message: "Quit date and user ID are required!" });
      }
   try {
     await UserModel.quitDate({ quit_date: quitDate, user_id: userId });
      return res.status(200).json({ message: "Date updated successfully!" });
   }
   catch(error){
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
   }
  },
};

module.exports = UserController;
