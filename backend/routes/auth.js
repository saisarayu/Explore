const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAuthenticated } = require("../middleware/auth");
const sendOtp = require("../utils/sendOtp");
const otpStore = require("../utils/otpStore");
const passport = require("passport");

const router = express.Router();

// --- LOGIN ROUTES ---

// GET login test route
router.get("/login", (req, res) => {
  res.status(200).send("Login page ready");
});

// POST login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Email and password are required", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return next(new ErrorHandler("User not found", 400));

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      return next(new ErrorHandler("Invalid credentials", 400));

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// --- OTP ROUTES ---

// POST send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const otp = await sendOtp(email);

    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // OTP valid for 5 minutes
    };

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// POST verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtpData = otpStore[email];

  if (!storedOtpData)
    return res.status(400).json({ success: false, message: "No OTP found for this email." });

  if (Date.now() > storedOtpData.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired." });
  }

  if (storedOtpData.otp !== otp)
    return res.status(400).json({ success: false, message: "Invalid OTP." });

  res.json({ success: true, message: "OTP verified successfully." });
});

// --- SIGNUP ROUTES ---

// GET signup test route
router.get("/signup", (req, res) => {
  res.status(200).send("Signup page ready");
});

// POST signup
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password)
      return next(new ErrorHandler("All fields are required", 400));

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return next(new ErrorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// POST reset password
router.post("/reset-password", async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const storedOtpData = otpStore[email];
    if (!storedOtpData || storedOtpData.otp !== otp || Date.now() > storedOtpData.expiresAt) {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete otpStore[email];

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// --- GOOGLE OAUTH ROUTES ---

// Initial request to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // Successful authentication, redirect to frontend with token
    const user = req.user;
    const token = require("jsonwebtoken").sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect back to frontend (adjust URL if needed)
    res.redirect(`http://localhost:5173/auth?token=${token}`);
  }
);

// --- PROTECTED USER INFO ROUTE ---

// GET /me
router.get("/me", isAuthenticated, async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
