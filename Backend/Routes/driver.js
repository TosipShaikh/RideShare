const express = require("express");
const { handleDriverSignUp, handleDriverLogin , handleToGetDriverDetails,handleDriverLogOut} = require("../Handlers/driver");
const checkForDriverAuthenticationCookie = require("../Middleware/DriverAuthentication");
const app = express();

app.post("/signup",handleDriverSignUp);

app.post("/login",handleDriverLogin);

app.get("/profile",checkForDriverAuthenticationCookie("token"),handleToGetDriverDetails);

app.post("/logout",checkForDriverAuthenticationCookie("token"),handleDriverLogOut);



module.exports = app;