const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Vikash",
    lastName: "Kumar",
    emailId: "vikash@gmail.com",
    password: "password123",
  });

  try {
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send("User registration failed ", +error.message);
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => console.log("conection failed: "));
