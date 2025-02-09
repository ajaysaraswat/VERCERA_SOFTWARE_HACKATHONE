const Alert = require("../models/alert");
const User = require("../models/user");
const sendEmail = require("../services/sendEmail");
//const { setCache, getCache } = require("../Redis/utils");

const handlepostAlert = async (req, res) => {
  try {
    //console.log("req.user", req.User._id);
    const { symbol, condition, targetPrice } = req.body;
    const userId = req.user._id;
    // const user = req.User
    if (!userId || !symbol || !condition || !targetPrice) {
      return res.status(400).json({ error: "all target fields are required" });
    }
    const userExists = await User.findById(userId);
    console.log("userExists", userExists);

    if (!userExists) return res.status(404).json({ error: "User not found" });
    const newAlert = await Alert.create({
      userId: userId,
      symbol: symbol,
      condition: condition,
      targetPrice: targetPrice,
    });
    console.log("newAlert", newAlert);

    (await newAlert).save(); // ye abhi kiya hai
    // return res.status(201).json({
    //   message: "Alert created sucessfully",
    //   alerts: newAlert,
    // });
    return res.redirect("/");
  } catch (err) {
    console.log("Error creating alert", err.message);
    res.status(500).json({ error: "internal server error" });
  }
};

//function to monitor and check alerts

const monitorAlerts = async (latestPrices) => {
  try {
    const alerts = await Alert.find({ isTriggered: false });
    for (const alert of alerts) {
      const { userId, symbol, condition, targetPrice } = alert;
      // console.log("userId", userId);
      if (latestPrices[symbol]) {
        const currentPrice = latestPrices[symbol].price;
        // console.log("current price", currentPrice);
        const conditionMet =
          (condition === "greaterThan" && currentPrice > targetPrice) ||
          (condition === "lessThan" && currentPrice < targetPrice);

        if (conditionMet) {
          alert.isTriggered = true;
          await alert.save();

          const user = await User.findById(userId);
          console.log("user ofr email", user);
          if (user) {
            user.alerts.push(alert._id);
            user.save();

            //send email
            console.log("function called before");
            await sendEmail(
              user.email,
              symbol,
              currentPrice,
              condition,
              targetPrice
            );
            console.log("function called after");
          }
        }
      }
    }
  } catch (err) {
    console.log("Error monitoring alerts", err);
  }
};
const handlegetalert = (req, res) => {
  const symbol = req.params.symbol;
  console.log("req.user", req.user);
  if (!req.user) {
    return res.render("register");
  }
  res.render("alert", {
    symbol: symbol,
    userId: req.User,
  });
  console.log("Server API initialized");
};

module.exports = {
  handlepostAlert,
  monitorAlerts,
  handlegetalert,
};
