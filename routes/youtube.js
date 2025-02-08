const express = require("express");
const {
  handleGetData,handlePostData
} = require("../controllers/youtube.js");

const youtubeRouter = express.Router();

youtubeRouter.get("/summary", handleGetData);
youtubeRouter.post("/post",handlePostData)

module.exports = youtubeRouter;
