const express = require("express");
const {
  handleGetData,
  handlePostData,
  handlegetyoutube,
  handlegetsummary,
} = require("../controllers/youtube.js");

const youtubeRouter = express.Router();

youtubeRouter.get("/summary", handleGetData);
youtubeRouter.post("/post", handlePostData);
//for testing
youtubeRouter.get("/youtube", handlegetyoutube);
youtubeRouter.get("/youtube/summary", handlegetsummary);

module.exports = youtubeRouter;
