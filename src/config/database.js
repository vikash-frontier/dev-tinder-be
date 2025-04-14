//iKMxksVVlvPGtHKh

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vikash810917:iKMxksVVlvPGtHKh@dev-tinder.z4pf0.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
