const mongoose = require("mongoose");

const ytSchema = new mongoose.Schema({
  id:String,
  description:String,
  url:String,
  summary:String

})

const Youtube = mongoose.model("Youtube",ytSchema);

module.exports =  Youtube;