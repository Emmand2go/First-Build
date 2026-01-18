import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from 'axios'
import {  useNavigate } from "react-router-dom";
import Dashboard from './Dashboarder/Dashboard';

const Login = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser]=([])

  const handleLogin = async (e) => {
     // Validation check
  if (!email.trim() || !password.trim()) {
    setError("Please fill in all required fields.");
    return;
  }
    
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
setSubmitted(true);
    try {
      const response =await axios.post (
        "https://students-learning-api.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const userData  = response.data;

      // Store token and user info in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
// setIsAuthenticated(true)
      setSuccess("Login successful!");
      console.log("Response:", response.data);
      // navigate('/dashboard')
      

      // Example: save token
      // const user=res.data
      // console.log("API response data:", res.data);
      // if (response.data) {
      // const user  = response.data;
      //   localStorage.setItem('user', JSON.stringify(user));
      // }
      // console.log("User data stored in localStorage:",localStorage.getItem("user"));
      onLoginSuccess();     // let App.js know the user is authenticated
      // setIsAuthenticated(true);
      navigate('/home')
    } catch (err) {
      console.error(err);
      if (err.response) {
        // Server returned an error message
        setError(err.response.data.message || "Login failed!");
      } else {
        setError("Network error, try again.");
        navigate('/')
      }
    }

    setLoading(false);
  };


  return (
    <div className="login-overlay">

      <motion.div
      className="login-panel"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, sm: 5 },
            width: { xs: "90%", sm: 400 },
            borderRadius: "20px",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Lock Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1976d2, #42a5f5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              mb: 2,
              boxShadow: "0 4px 20px rgba(25, 118, 210, 0.5)",
            }}
          >
            <LockOutlined sx={{ fontSize: 40, color: "#fff" }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: "#0d47a1" }}
          >
            Login Required
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
             onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              error={submitted && !email.trim()}
  helperText={
    submitted && !email.trim() ? "Email is required" : ""
  }
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": { borderRadius: "12px" },
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
             value={password}
              onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            variant="outlined"

            error={submitted && !password.trim()}
  helperText={
    submitted && !password.trim() ? "Password is required" : ""
  }
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": { borderRadius: "12px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            size="large"
            sx={{
              py: 1.4,
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "1rem",
              background: "linear-gradient(135deg, #1976d2, #0d47a1)",
              
             
            }}
          >
             {loading ? "Logging in..." : "Login"}     {/* Login */}
          </Button>

          {/* Footer Text */}
          <Typography
            variant="body2"
            sx={{ mt: 3, color: "text.secondary", textAlign: "center" }}
          >
            Don’t have an account?{" "}
            {/* <a
              href="/register"
              style={{
                color: "#1976d2",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign up
            </a> */}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#1976d2",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sign Up
            </span>
          </Typography>
        </Paper>
      </motion.div>
    
      </div>
    
  );
};

export default Login;