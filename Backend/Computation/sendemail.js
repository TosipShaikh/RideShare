const nodemailer = require("nodemailer");
require("dotenv").config();

const EMAILPASSWORD = process.env.EMAILPASSWORD; // Use environment variable for email password

function sendEmailToDriver(driverEmail, userDetails, rideDetails) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "iomgholap123@gmail.com",
      pass: EMAILPASSWORD, // use env variable in production
    },
  });

  const {
    name: userName,
    phone: userPhone,
    userStart,
    userEnd,
    userTime,
    estimatedCost,
  } = userDetails;

  const {
    rideStart,
    rideEnd,
    rideDate,
    rideTime,
  } = rideDetails;

  const mailOptions = {
    from: "iomgholap123@gmail.com",
    to: driverEmail,
    subject: "📌 New Ride Booking Request",
    text: `
Hello Driver,

You have received a new ride booking request!

===============================
🚗 Ride Details:
Your Ride Start Location : ${rideStart}
Your Ride End Location   : ${rideEnd}
Date of Ride             : ${rideDate}
Time of Ride             : ${rideTime}

===============================
📍 User Preferences:
User Start Location      : ${userStart}
User End Location        : ${userEnd}
Preferred Pickup Time    : ${userTime}
Estimated Fare        : ₹${estimatedCost}

===============================
👤 User Information:
Name                    : ${userName}
Phone Number            : ${userPhone}

Please contact the user if needed and prepare for the ride.

Thanks,  
RideShare Team 🚀
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error("❌ Error sending email:", err);
    else console.log("✅ Email sent to driver:", info.response);
  });
}


module.exports = { sendEmailToDriver };