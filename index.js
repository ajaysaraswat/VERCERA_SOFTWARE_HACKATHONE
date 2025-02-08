const express = require("express");
require("dotenv").config();
const { connecttoMongoDB } = require("./connection/connection");
const app = express();
const youtubeRouter = require("./routes/youtube");
const path = require("path");
const PORT = 8000;
connecttoMongoDB(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.json({ message: "working" });
});
app.use("/", youtubeRouter);
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
