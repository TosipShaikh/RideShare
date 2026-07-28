const driver = require("../Model/driver.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {fetchDLDetails} = require("../APIs/dlAPI.js");
require("dotenv").config({ path: "../.env" });


async function handleDriverSignUp(req, res) {
  console.log("Request to sign up received!!");
  const newuser = req.body;
  console.log(newuser);

  // Validate required fields
  if (
    !newuser ||
    !newuser.firstName ||
    !newuser.lastName ||
    !newuser.emailId ||
    !newuser.gender ||
    !newuser.password ||
    !newuser.confirmPassword ||
    !newuser.mobileNumber ||
    !newuser.vehicleNumber ||
    !newuser.drivingLicenseNumber ||
    !newuser.dateOfBirth ||
    !newuser.state ||
    !newuser.address ||
    !newuser.vehicleName
  ) {
    console.log({ msg: "failed", error: "Field missing or incorrect in signup form." });
    return res.status(400).json({ msg: "failed", error: "Field missing or incorrect in signup form." });
  }


  try {
   
    const existingDriver = await driver.findOne({ emailId: newuser.emailId });
    if (existingDriver) {
      return res.status(400).json({ msg: "failed", error: "Email already registered." });
    }
  
    const created = await driver.create({
      firstName: newuser.firstName,
      lastName: newuser.lastName,
      gender: newuser.gender,
      mobileNumber: newuser.mobileNumber,
      emailId: newuser.emailId,
      password: newuser.password,
      vehicleNumber: newuser.vehicleNumber,
      drivingLicenseNumber: newuser.drivingLicenseNumber,
      address: newuser.address,
      state: newuser.state,
      dateOfBirth: newuser.dateOfBirth,
      report: 0,
      vehicleName: newuser.vehicleName,
      image : `${newuser.emailId}.jpg`
    });
console.log(created);
    if (!created) {
      console.log({ msg: "failed", error: "Error while creating user." });
      return res.status(500).json({ msg: "failed", error: "Error while creating user." });
    }

    // res.setHeader("Content-Type", "application/json");
    console.log("User signed up successfully!!");
    return res.status(201).json({ msg: "success" });

  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ msg: "failed", error: "Server error." });
  }
}


 const handleDriverLogin = async (req,res)=>{
  const {emailId , password} = req.body;
  if (!emailId || !password) {
    return res.status(404).json({ msg: "Invalid fields Entered!!!" });
  }

  const user = await driver.matchedUserAndGenerateToken(emailId , password);


 if(user.error)
  {
    return res.status(500).json({error : "Sign In failed!!"});
  }

  console.log(user);
  console.log("Token of user: ",user.token);
  const token = user.token ;
  return res.status(200).cookie('token' ,token , { httpOnly: true , secure : false , sameSite : 'Lax' , maxAge: 24 * 60 * 60 * 1000 ,} ).json({msg : "Sign In succedded"});
}

async function handleDriverLogOut(req, res) {

  try {

    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: 'Lax' });
    console.log("User logged out successfully"); 
    
    
    return res.status(200).json({ msg: "success" });

  } catch (error) {


    console.error("Error during logout:", error);
    return res.status(500).json({ msg: "failed", error: "Server error." });
  }
}



async function handleSendDriverDetails(req,res){
    const driverId = req.body.userid;
    console.log(driverId);
    console.log("Request to send info recieved");
    const driverInfo = await driver.findById(driverId);
    if(!driverInfo)
    {
        console.log("User does not exist in database!!");
        return res.status(404).json({msg : "Failed to fetch userdetails"});
    }
    return res.status(200).json({name : `${driverInfo.firstName} ${driverInfo.lastName}`, 
    image : driverInfo.image , vehicleName : driverInfo.vehicleName , vehicleNumber : driverInfo.vehicleNumber})
}

async function handleToGetDriverDetails(req, res) {
  const driverId = req.user.userId;
  console.log("Request to get driver details received for ID:", driverId);

  try {
    const driverInfo = await driver.findById(driverId);
    if (!driverInfo) {
      console.log("Driver does not exist in database!");
      return res.status(404).json({ msg: "Failed to fetch user details" });
    }


  
    return res.status(200).json({
      name: `${driverInfo.firstName} ${driverInfo.lastName}`,
      image: driverInfo.image,
      vehicleName: driverInfo.vehicleName,
      vehicleNumber: driverInfo.vehicleNumber,
    });
  } catch (error) {
    console.error("Error fetching driver details:", error);
    return res.status(500).json({ msg: "failed", error: "Server error." });
  }
} 

module.exports = {handleDriverSignUp,handleDriverLogin,handleSendDriverDetails , handleDriverLogOut , handleToGetDriverDetails};