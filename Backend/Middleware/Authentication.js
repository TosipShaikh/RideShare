const { validateToken } = require("../Services/Authentication.js")

 function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if (tokenCookieValue) {
            console.log("Middleware Token cookie value: ",tokenCookieValue);
        }
        if(!tokenCookieValue)
        {
           return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }catch(error)
        {
            console.log("Error in middleware while checking token!",error);
        }
        next();
    }
}

module.exports = checkForAuthenticationCookie;