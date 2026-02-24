const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const sendOtp = async (email) => {
  console.log(`Attempting to send OTP to: ${email}`);
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

  console.log(`Using EMAIL_USER: ${process.env.EMAIL_USER}`);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error in transporter.sendMail:", error.message);
    console.log("-----------------------------------------");
    console.log(`[DEVELOPMENT] OTP for ${email}: ${otp}`);
    console.log("-----------------------------------------");
    // We still return the OTP so testing can continue
  }
  return otp;
};

module.exports = sendOtp;
