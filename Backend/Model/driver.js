const {createHmac,randomBytes} = require("crypto");
const mongoose = require("mongoose");
const {createTokenForUser} = require("../Services/Authentication.js");
const driverSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender : {
      type : String,
      required : true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    drivingLicenseNumber:{
      type : String,
      required : true,
      unique : true,
    },
    dateOfBirth:{
      type : String,
      required : true,
    },
    vehicleName : {
      type : String,
      required : true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    report : {
      type : String,
      required : true,
    },
    image : {
      type : String,
      required : true,
    },
    salt : {
        type : String,
    },
    role : {
      type : String,
      default : "driver"
    }
  },
  { timestamps: true }
);

driverSchema.pre("save",function(next){
    const driver = this;  //pointing to current user
    if(!driver.isModified("password"))
    {
        return next();
    }

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(driver.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

driverSchema.static("matchedUserAndGenerateToken",async function (emailId , password){
    const user = await this.findOne({emailId}).lean();      //it convert mongoose object to simple js object
    console.log("In matcheduserandgeneratetoken: ");
    console.log({emailId , password});
    console.log(user);
    if(!user) 
    {
        return {error : "Email Id Incorrect"}
    }

    const salt = user.salt;
    const hashedPassword = user.password;
    const UserProvidedHashedPassword = createHmac("sha256",salt).update(password).digest("hex");
    
    if(UserProvidedHashedPassword != hashedPassword)
    {
        return {error : "Password Incorrect"};
    }

    const token = createTokenForUser(user);
    console.log("Token setted: ",token);
    return {token : token , msg : "Sign In Succeeded"}; 
})


const driver = mongoose.model("driver",driverSchema);

module.exports = driver;