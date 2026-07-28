const { validateToken } = require("../Services/Authentication.js");

 function getTokenDetails(req,res){
    const token = req.cookies["token"];
    if(!token)
    {
        return res.status(401).json({error : "User is not Authenticated!!!" , role : null});
    }
    try{
            const userPayload = validateToken(token);
            req.user = userPayload;
            console.log("userPayload : ",userPayload);
            return res.status(200).json({msg: "Success", role: userPayload.role , userid : userPayload.userId});
        }catch(error)
        {
            console.log("Error in middleware while checking token!",error);
            return res.status(401).json({error : "Error Occured in accessing tokem details!", role: null , userid : null});
        }
}


module.exports = {getTokenDetails};
