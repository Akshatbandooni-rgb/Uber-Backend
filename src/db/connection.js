const mongoose = require("mongoose");
const Constants = require("../constants");

const MONGO_URI = `${process.env.MONGO_URI}/${Constants.DB_NAME}`;

const connectDB = async () => {
  console.log(MONGO_URI);
  return await mongoose.connect(MONGO_URI);
};
module.exports = connectDB;
