const express = require("express");
require("dotenv").config();
const { connecttoMongoDB } = require("./connection/connection");
const app = express();

const PORT = 8000;
console.log("url", process.env.MONGO_URL);
connecttoMongoDB(process.env.MONGO_URL);

app.get("/", (req, res) => {
  return res.json({ message: "working" });
});

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
