const Youtube = require("../models/youtube");
const axios = require("axios");

const handleGetData = async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/test");
    console.log(response.data); // Log the actual data from the response

    return res.json({
      data: response.data // Send only the necessary data, not the entire Axios response object
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({
      message: "Error fetching data from external API"
    });
  }
};

module.exports = { handleGetData };
