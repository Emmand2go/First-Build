import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function VerifyEmail() {
  const { state } = useLocation();
  const email = state?.email;

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async () => {
    const res = await axios.post("http://localhost:5000/verify-email", {
      email,
      code,
    });

    setMsg(res.data.message);
  };

  return (
    <div>
      <h2>Verify your email</h2>
      <p>Enter the 6-digit code sent to {email}</p>

      <input
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>

      <p>{msg}</p>
    </div>
  );
}

// const handleRegister = async () => {
//   await axios.post("http://localhost:5000/register", {
//     email,
//     password,
//   });

//   navigate("/verify", { state: { email } });
// };

// Verify code backend
// app.post("/verify-email", async (req, res) => {
//   const { email, code } = req.body;

//   const user = await findUserByEmail(email);

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   if (user.emailConfirmed) {
//     return res.json({ message: "Already verified" });
//   }

//   if (user.emailCode !== code) {
//     return res.status(400).json({ message: "Invalid code" });
//   }

//   if (user.codeExpires < Date.now()) {
//     return res.status(400).json({ message: "Code expired" });
//   }

//   user.emailConfirmed = true;
//   user.emailCode = null;
//   user.codeExpires = null;

//   await updateUser(user);

//   res.json({ message: "Email verified successfully" });
// });

// reg and send code
// app.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   const code = generateOTP();

//   const user = {
//     email,
//     password,
//     emailConfirmed: false,
//     emailCode: code,
//     codeExpires: Date.now() + 10 * 60 * 1000, // 10 min
//   };

//   await saveUser(user);
//   await sendEmailCode(email, code);

//   res.json({ message: "Verification code sent", email });
// });

// // Example with Mongoose
// import User from "./userModel.js"; // MongoDB user model

// app.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Missing email or password" });
//   }

//   const code = generateOTP();
//   const newUser = new User({
//     email,
//     password,  // Remember to hash passwords in production
//     emailConfirmed: false,
//     emailCode: code,
//     codeExpires: Date.now() + 10 * 60 * 1000, // 10-minute expiration
//   });

//   await newUser.save();
//   await sendEmailCode(email, code);

//   res.json({ message: "Verification code sent" });
// });

// // userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   emailConfirmed: { type: Boolean, default: false },
//   emailCode: { type: String },  // OTP code
//   codeExpires: { type: Date },  // Expiration time for OTP
// });

// const User = mongoose.model("User", userSchema);

// export default User;


// index.js
// import express from "express";
// import { generateOTP } from "./utils.js"; // Import the OTP function
// import { sendEmailCode } from "./email.js"; // Import email sending function
// import { users } from "./db.js"; // Mock DB

// const app = express();
// app.use(express.json());

// // Register Route
// app.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Missing email or password" });
//   }

//   // Generate the OTP
//   const code = generateOTP();

//   // Create a new user with email, hashed password, OTP, and expiry
//   const user = {
//     email,
//     password, // Store password securely (hash it in real apps)
//     emailConfirmed: false,
//     emailCode: code,  // Store the OTP here
//     codeExpires: Date.now() + 10 * 60 * 1000,  // Set expiry time (e.g., 10 minutes)
//   };

//   // Store user in DB (mock DB here, replace with real DB logic)
//   users.push(user);

//   // Send email with OTP
//   await sendEmailCode(email, code);

//   res.json({ message: "Verification code sent to your email" });
// });

// // Start server
// app.listen(5000, () => {
//   console.log("Server is running on http://localhost:5000");
// });