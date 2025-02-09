const express = require("express");
require("dotenv").config();
const { connecttoMongoDB } = require("./connection/connection");
const app = express();
const userRouter = require("./routes/user");
const youtubeRouter = require("./routes/youtube");
const coinRouter = require("./routes/coin");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const financeRouter = require("./routes/finance");
const handleSocketConnection = require("./socketHandler");

const PORT = 8000;

connecttoMongoDB(process.env.MONGO_URL);

const server = http.createServer(app);
const io = new Server(server);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("home");
});
app.post("/youtube/data", (req, res) => {
  const body = req.body;
  if (!body) return res.json({ message: "Give URL" });

  return res.json({
    summary:
      "## Definition/Background\n- The text appears to be lyrics from a song, likely in Hindi language.\n\n## Main characteristics\n- **Lyrics** expressing emotions of separation and heartbreak.\n- Themes of love, longing, and betrayal.\n\n## Implementation details\n- The text uses poetic language and metaphors to convey emotions.\n- Repetition of phrases for emphasis and impact.\n- Cultural references and symbolism common in songs about love and relationships.\n\n## Advantages/Disadvantages\n- Advantages:\n  - Evokes strong emotions and connects with listeners who have experienced similar feelings.\n  - Engages the audience through relatable themes.\n- Disadvantages:\n  - May not be suitable for all audiences due to the intense emotions and complex language.\n  - Requires a deeper understanding of the cultural context to fully appreciate its meaning.",
    topics: [],
    title:
      "Full Video: Raanjhan | Do Patti | Kriti Sanon, Shaheer Sheikh | Parampara Tandon | Sachet-Parampara",
    description:
      'Presenting the Full Video Song "Raanjhan" from the Film "Do Patti". Starring Kajol, Kriti Sanon, Shaheer Sheikh and Tanvi Azmi. Sung by Parampara Tandon, Composed by Sachet-Parampara and Written by Kausar Munir.\n\n#DoPatti #Raanjhan #KritiSanon #ShaheerSheikh \n\n♪Full Song Available on♪ \nJioSaavn: https://bit.ly/3TXinY7\nSpotify: https://bit.ly/47W2BCL\nHungama: https://bit.ly/3BsifcK\nApple Music: https://bit.ly/4eum5ko\nGaana: https://bit.ly/3Ye6qjz\nAmazon Prime Music: https://bit.ly/3zLHXbJ\nYouTube Music: https://bit.ly/47XQB3O\n\nSong Credits:\nMusic Director - Sachet-Parampara\nSinger - Parampara Tandon\nLyrics - Kausar Munir \nProduced by - Sachet-Parampara, Prasanna Suresh and Raghav Sharma \nMusic Assistant - Raghav Sharma\nVocals recorded at Sachet-Parampara Studio (SP Studio)\nMix and Master - Aftab Khan\n\nFilm Credits:\nCredits Produced By: Kathha Pictures & Blue Butterfly \nFilms Producers: Kanika Dhillon & Kriti Sanon \nWritten By: Kanika Dhillon \nDirected By: Shashanka Chaturvedi \nCast: Kajol Devgn, Kriti Sanon, Shaheer Sheikh, Tanvi Azmi\n\nDownload Song Beat: https://bit.ly/3Cjh24R \n\n___________________________________\nEnjoy & stay connected with us!\n👉 Subscribe to T-Series: https://youtube.com/tseries\n👉 Like us on Facebook: https://www.facebook.com/tseriesmusic\n👉 Follow us on X: https://twitter.com/tseries\n👉 Follow us on Instagram: https://instagram.com/tseries.official',
    id: "lBvbNxiVmZA",
    youtubeUrl: "https://youtu.be/lBvbNxiVmZA?si=4V9ENVAHwGuJd4bW",
  });
});

app.use("/", youtubeRouter);
app.use("/", userRouter);
app.use("/", financeRouter);

//initialize the socket connection
handleSocketConnection(io);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
