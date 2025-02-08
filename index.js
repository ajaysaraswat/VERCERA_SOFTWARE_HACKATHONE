const express = require("express");
require("dotenv").config();
const { connecttoMongoDB } = require("./connection/connection");
const app = express();
const userRouter = require("./routes/user");
const youtubeRouter = require("./routes/youtube");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = 8000;
connecttoMongoDB(process.env.MONGO_URL);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("home");
});
app.use("/", youtubeRouter);
app.use("/", userRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
