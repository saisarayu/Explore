const express = require('express');
const router = express.Router();
const sendOtp = require('../utils/sendOtp');
const otpStore = require('../utils/otpStore');

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = await sendOtp(email);

  otpStore[email] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  res.json({ success: true, message: "OTP sent to email" });
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedData = otpStore[email];

  if (!storedData) {
    return res.status(400).json({ success: false, message: "OTP not requested or expired" });
  }

  if (Date.now() > storedData.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (storedData.otp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // OTP is valid
  res.json({ success: true, message: "OTP verified successfully" });
});

module.exports = router; 