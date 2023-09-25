const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
    first: String,
    last : String,
    email: String,
    department : String,
    salary : Number
})

const EmpModel = mongoose.model("emp", empSchema);
module.exports ={
    EmpModel
}