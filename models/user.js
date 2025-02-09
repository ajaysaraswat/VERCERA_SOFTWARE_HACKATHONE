const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { setuser } = require("../services/auth");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    alerts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alert",
      },
    ],
    salt: {
      type: String,
    },
    youtubeList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Youtube",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", function (next) {
  const user = this;
  
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;
  next();
});

// Static method for password matching and token generation
userSchema.static("matchPasswordandGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (user.password !== userProvidedHash) {
    throw new Error("Incorrect password");
  }

  const token = setuser(user);
  return token;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
