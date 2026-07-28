const { validateToken } = require("../Services/Authentication.js")

 function checkForDriverAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if (tokenCookieValue) {
            console.log("Middleware Token cookie value: ",tokenCookieValue);
        }
        if(!tokenCookieValue)
        {
            console.log("Driver is not authenticated!!");
           return res.status(401).json({error : "Driver is not authenticated!"});
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            if(userPayload.role != "driver")
            {
                return res.status(401).json({error : "Driver is not authenticated!"});
            }
            req.user = userPayload;
        }catch(error)
        {
            console.log("Error in middleware while checking token!",error);
        }
        next();
    }
}

module.exports = checkForDriverAuthenticationCookie;