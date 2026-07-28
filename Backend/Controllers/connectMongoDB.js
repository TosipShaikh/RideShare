const mongoose = require("mongoose");

function connectMongoDB(url)
{
    if (!mongoose.connection.readyState) {
        mongoose.connect(url).then(
            ()=>{
                console.log("MongoDB connected successfully!!");
            }
        )
        .catch(
            ()=>{
                console.log("Error while connecting database")
            }
        )
    }
}

module.exports = {connectMongoDB};



    
  