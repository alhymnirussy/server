import { User } from "../models/User.js";
import { sendMail } from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

    user = await User.create({
      name,
      email,
      password,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    await sendMail(email, "info penting", `Your OTP is ${otp}`);

    sendToken(res, user, 201, "OTP sent to your email, please verify your account");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
