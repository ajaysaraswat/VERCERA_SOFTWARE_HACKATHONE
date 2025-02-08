const express = require("express");
const {
  handleGetFinance
} = require("../controllers/finance");

const financeRouter = express.Router();

financeRouter.get("/finance",handleGetFinance)

module.exports = financeRouter;
