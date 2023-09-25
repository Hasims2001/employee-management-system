const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { EmpModel } = require("../model/empModel");
const empRouter = express.Router();

empRouter.get("/", auth, async (req, res) => {
    const {limit, page} = req.body;
  try {
    const emp = await EmpModel.find().limit(limit).skip(page);
      res.send({ issue: false, msg: "all employee data", emp:emp });
  } catch (error) {
    res.send({ issue: true, msg: error.message });
  }
});

empRouter.post("/add", auth, async (req, res) => {
  const { email } = req.body;
  try {
    let emp = await EmpModel.findOne({ email: email });
    if (emp !== null) {
      res.send({ issue: true, msg: "employee is already registed" });
    } else {
      let newemp = new EmpModel(req.body);
      newemp.save();
      res.send({ issue: false, msg: "successfully Added", emp: req.body });
    }
  } catch (error) {
    res.send({ issue: true, msg: error.message });
  }
});

module.exports = {
  empRouter,
};
