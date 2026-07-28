const JWT = require("jsonwebtoken");

const secret = "$Black@Panther_CB98";

 function  createTokenForUser(user){
    const payload = {
        userId : user._id,
        role : user.role,
    }

    const token = JWT.sign(payload , secret);
    console.log(token);
    return token ;
}

 function validateToken(token){
    console.log(token);
    const payload = JWT.verify(token , secret);
    return payload;
}

module.exports = {createTokenForUser , validateToken};



