const mongoose = require("mongoose");

const ytSchema = new mongoose.Schema({
  id:String,
  description:String,
  youtubeUrl:String,
  summary:String,
  topics:[String],
  title:String
})

const Youtube = mongoose.model("Youtube",ytSchema);

module.exports =  Youtube;