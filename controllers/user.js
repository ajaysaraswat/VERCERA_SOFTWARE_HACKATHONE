const User = require("../models/user");
const Youtube = require("../models/youtube")
const handlepostuser = async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body);
    if (!body) return res.status(400).send({ message: "invalid body" });
    const user = await User.create({
      fullname: body.fullname,
      email: body.email,
      password: body.password,
    });

    return res
      .status(201)
      .json({ status: "Created Successfully", message: user._id });
    // return res.redirect("/user/signin");
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const handlepostsignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const uid = await User.matchPasswordandGenerateToken(email, password);

    res.cookie("uid", uid);
    // res.render("home");
    return res.json({ message: "login succesfully", "jwt token ": uid });
  } catch (err) {
    //return res.redirect("/");
    return res.json({ message: err.message });
  }
};

const handlelogout = (req, res) => {
  res.clearCookie("uid").redirect("/user/signin");
};

const handlegetuser = (req, res) => {
  return res.render("register");
};

const handlegetsignin = (req, res) => {
  return res.render("login");
};
//kuldeep
const handlepostsummary = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const userId = req.user._id;
  console.log("handlepost",userId)
  const videoId = req.body.videoId;
  console.log(videoId)

  try {
    // Create new YouTube video data
    const youtubeData = {
      summary: "## Definition/Background\n- The text appears to be lyrics...",
      topics: [],
      title: "Full Video: Raanjhan | Do Patti...",
      description: 'Presenting the Full Video Song "Raanjhan"...',
      id: "lBvbNxiVmZA",
      youtubeUrl: "https://youtu.be/lBvbNxiVmZA?si=4V9ENVAHwGuJd4bW",
    };

    // Save the YouTube video
    const youtubeVideo = new Youtube(youtubeData);
    await youtubeVideo.save();
    console.log(youtubeVideo)
    if (!youtubeVideo) {
      return res.status(500).json({ message: "Failed to save YouTube video" });
    }

    // Find the user and update youtubeList
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user mil gya")
    user.youtubeList.push(youtubeVideo._id);
    await user.save();
    console.log("user mai save hogya")
    return res.status(200).json({ message: "Summary added and user updated" });

  } catch (err) {
    console.error("Error in handlepostsummary:", err);
    return res.status(500).json({ message: err.message });
  }
};
const handlegetsummary = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const userId = req.user._id;

    // Find the user and populate the YouTube list with detailed video data
    const user = await User.findById(userId).populate("youtubeList");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return YouTube videos associated with the user
    return res.status(200).json({
      message: "YouTube videos retrieved successfully",
      youtubeVideos: user.youtubeList,
    });
  } catch (err) {
    console.error("Error in handlegetsummary:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handlepostuser,
  handlepostsignin,
  handlelogout,
  handlegetuser,
  handlegetsignin,
  handlepostsummary,
  handlegetsummary
};
