const nodemailer = require("nodemailer");
// Importing Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // Enter Your Gmail Account & Password Here !
    user: "marina.spot.booking@gmail.com",
    pass: "marinaspot",
  },
});
// Exporting Transporter Function from Nodemailer Generate Email To Users
module.exports = transporter;
