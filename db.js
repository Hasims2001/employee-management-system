const mongoose = require('mongoose');
require('dotenv').config();
const ConnectToDB = mongoose.connect(process.env.MONGO_URL);

module.exports ={
    ConnectToDB
}