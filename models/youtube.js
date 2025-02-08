const mongoose = require("mongoose");

const ytSchema = new mongoose.Schema({
  name:String,
  description:String,
})

const Youtube = mongoose.model("Chat",ytSchema);

module.exports =  Chat;