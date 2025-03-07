const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello");
});

app.use("/app", (req, res) => {
  res.send("Hello from the Dashboard");
});

app.use("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
