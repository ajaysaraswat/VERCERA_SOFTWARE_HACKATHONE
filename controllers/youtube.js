const Youtube = require("../models/youtube");
const axios = require("axios");

// Fetch data from external API
const handleGetData = async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/test");
    console.log(response.data);

    return res.json({
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({
      message: "Error fetching data from external API",
    });
  }
};

// Insert data into Youtube model
const handlePostData = async (req, res) => {
  try {
    const { id, title, description, url } = req.body;

    // Check if data with the same ID already exists
    const existingVideo = await Youtube.findOne({ id });
    if (existingVideo) {
      return res
        .status(400)
        .json({ message: "Video with this ID already exists" });
    }

    // Save the new video to the database
    const newVideo = new Youtube({ id, title, description, url });
    await newVideo.save();

    return res.status(201).json({
      message: "Data added successfully",
      newVideo,
    });
  } catch (error) {
    console.error("Error adding data:", error.message);
    return res.status(500).json({
      message: "Error adding data to the database",
    });
  }
};

const handlegetyoutube = (req, res) => {
  return res.render("youtube");
};

module.exports = { handleGetData, handlePostData, handlegetyoutube };
