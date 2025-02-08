const express = require("express");
const {
  handleGetData
} = require("../controllers/youtube.js");

const youtubeRouter = express.Router();

youtubeRouter.get("/summary", handleGetData);



module.exports = youtubeRouter;
