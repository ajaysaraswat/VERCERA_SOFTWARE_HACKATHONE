const express = require("express");
const {
  handleGetData,
  handlePostData,
  handlegetyoutube,
} = require("../controllers/youtube.js");

const youtubeRouter = express.Router();

youtubeRouter.get("/summary", handleGetData);
youtubeRouter.post("/post", handlePostData);
//for testing
youtubeRouter.get("/youtube", handlegetyoutube);

module.exports = youtubeRouter;
