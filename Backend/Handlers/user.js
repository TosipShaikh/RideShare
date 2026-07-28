const user = require("../Model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {fetchDLDetails} = require("../APIs/dlAPI.js");
require("dotenv").config({ path: "../.env" });

async function handleUserSignUp(req, res) {
    console.log("Request to sign up received!!");
    const newuser = req.body;
    console.log(newuser);
  
    // Validate required fields
    if (
      !newuser ||
      !newuser.name ||
      !newuser.mobileNumber ||
      !newuser.password 
    ) {
      console.log({ msg: "failed", error: "Field missing or incorrect in signup form." });
      return res.status(400).json({ msg: "failed", error: "Field missing or incorrect in signup form." });
    }
  
    try {
      // Check if email already exists
      const existingUser = await user.findOne({ mobileNumber: newuser.mobileNumber });
      if (existingUser) {
        return res.status(400).json({ msg: "failed", error: "Email already registered." });
      }
  
      // Create new driver
      const created = await user.create({
        fullName: newuser.name,
        mobileNumber: newuser.mobileNumber,
        password: newuser.password,
      });
  
      if (!created) {
        console.log({ msg: "failed", error: "Error while creating user." });
        return res.status(500).json({ msg: "failed", error: "Error while creating user." });
      }
      console.log(created);
  
      console.log("User signed up successfully!!");
      return res.status(201).json({ msg: "success" });
  
    } catch (error) {
      console.error("Error in signup:", error);
      return res.status(500).json({ msg: "failed", error: "Server error." });
    }
  }
  
async function handleUserLogOut(req, res) {

  try {

    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: 'Lax' });
    console.log("User logged out successfully"); 
    
    
    return res.status(200).json({ msg: "success" });

  } catch (error) {


    console.error("Error during logout:", error);
    return res.status(500).json({ msg: "failed", error: "Server error." });
  }
}


   const handleUserLogin = async (req,res)=>{
  const {mobileNumber , password} = req.body;
  if (!mobileNumber || !password) {
    return res.status(404).json({ msg: "Invalid fields Entered!!!" });
  }

  const User = await user.matchedUserAndGenerateToken(mobileNumber , password);
  console.log(User);
  
  if(User.error)
  {
    return res.status(500).json({error : "Sign In failed!!"});
  }

  console.log("Token of user: ",User.token);
  const token = User.token ;
  return res.status(200).cookie('token' ,token , { httpOnly: true , secure : false , sameSite : 'Lax' , maxAge: 24 * 60 * 60 * 1000 ,} ).json({msg : "Sign In succedded"});
}

async function handleToGetUserDetails(req, res) {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const userDetails = await  user.findById(userId, { password: 0, __v: 0 });
    if (!userDetails) {     
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {handleUserLogin,handleUserSignUp ,handleUserLogOut,handleToGetUserDetails};