const express = require("express");
const { getTokenDetails } = require("../Handlers/tokenHandler.js");
const tokenRouter = express.Router();

tokenRouter.get("/get-token",getTokenDetails);

module.exports = tokenRouter;