const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send({ issue: true, msg: "All fields are required." });
  } else {
    try {
      const check = await UserModel.findOne({ email: email });
      if (check) {
        res.send({ issue: true, msg: "user is already registered." });
      } else {
        bcrypt.hash(password, 5, async (err, hash) => {
          req.body.password = hash;
          const user = new UserModel(req.body);
          user.save();
          res.send({ issue: false, msg: "successfully registered" });
        });
      }
    } catch (error) {
      res.send({ issue: true, msg: error.message });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send({ issue: true, msg: "All fields are required." });
  } else {
    try {
      const check = await UserModel.findOne({ email: email });
      if (check !== null) {
        bcrypt.compare(password, check.password, (err, result) => {
          if (result) {
            const token  = jwt.sign({userId: check._id, userEmail: check.email}, process.env.VERIFY_KEY);

            res.send({issue : false, token : token})
          } else {
            res.send({ issue: true, msg: "Invalid Credentials!" });
          }
        });
      } else {
        res.send({ issue: true, msg: "Invalid Credentials!" });
      }
    } catch (error) {
      res.send({ issue: true, msg: error.message });
    }
  }
});
module.exports = {
  userRouter,
};
