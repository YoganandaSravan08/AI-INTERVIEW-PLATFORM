const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// send OTP function
const sendOTP = async (email, otp) => {
  try {

    const info = await transporter.sendMail({
      from: `"AI Interview Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification OTP",
      html: `
        <h2>Verify Your Email</h2>
        <p>Your OTP for email verification is:</p>
        <h1 style="color:blue;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `
    });

    console.log("✅ OTP Email Sent:", info.response);

  } catch (error) {

    console.log("❌ Mail Sending Failed:", error.message);

  }
};

module.exports = { sendOTP };