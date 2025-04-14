const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).send(`User registration failed: ${error.message}`);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const users = await User.findOne({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
  // const users = await User.find({});
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  // const emailId = req.body.emailId;
  const data = req.body;
  try {
    const allowedUpdates = ["userId", "photoUrl", "about", "skills", "age"];
    const isUpdatesAllowed = Object.keys(data).every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isUpdatesAllowed) {
      throw new Error("Invalid update fields");
    }

    if (data.skills.length > 10) {
      throw new Error("Skills should be less than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    // const user = await User.findOneAndUpdate({ emailId: emailId }, data);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Updates failed! " + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Somthing went wrong");
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
