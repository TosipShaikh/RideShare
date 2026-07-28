const {createHmac,randomBytes} = require("crypto");
const mongoose = require("mongoose");
const {createTokenForUser} = require("../Services/Authentication.js");

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    mobileNumber : {
        type : Number,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : "user"
    },
    salt :{
        type : String,
    }
},{timestamps : true});


userSchema.pre("save",function(next){
    const user = this;  //pointing to current user
    if(!user.isModified("password"))
    {
        return next();
    }

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchedUserAndGenerateToken",async function (mobileNumber , password){
    const user = await this.findOne({mobileNumber}).lean();      //it convert mongoose object to simple js object
    console.log("In matcheduserandgeneratetoken: ");
    console.log({mobileNumber , password});
    console.log(user);
    if(!user) 
    {
        return {error : "User Not Found"};
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



const user = mongoose.model("user",userSchema);

module.exports = user;