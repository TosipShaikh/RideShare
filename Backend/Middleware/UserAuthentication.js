const { validateToken } = require("../Services/Authentication.js")

 function checkForUserAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if (tokenCookieValue) {
            console.log("Middleware Token cookie value: ",tokenCookieValue);
        }
        if(!tokenCookieValue)
        {
           return res.status(401).json({error : "User is not authenticated!"});
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            if(userPayload.role != "user")
            {
                return res.status(401).json({error : "User is not authenticated!"});
            }
            req.user = userPayload;
        }catch(error)
        {
            console.log("Error in middleware while checking token!",error);
        }
        next();
    }
}

module.exports = checkForUserAuthenticationCookie;