import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Email } = location.state || {}; // Get email from the registration step

  const [otp, setOtp] = useState('');
  // const [loading, setIsResending] = useState(false); instead
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  // const [message, setMessage]=useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    // if (!Email) {
    //   setMessage({ type: 'error', text: 'Email missing. Please register again.' });
    //   return;
    // }
    setIsVerifying(true);
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/verify-email`, {
        Email,
        otp
      });
      setIsVerifying(false);
      navigate("/"); // Redirect to login after success
    } catch (error) {
      setIsVerifying(false);
      setError(error.response?.data?.error || 'OTP verification failed');
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setIsResending(true);
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/resend-otp`, { Email });
      setIsResending(false);
      setError('OTP sent to your email!');
    } catch (error) {
      setIsResending(false);
      setError(error.response?.data?.error || 'Failed to resend OTP');
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1565c0, #42a5f5)",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          width: { xs: "90vw", sm: 420 },
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: "#0d47a1", textAlign: "center" }}>
          {error ? error : 'Verify OTP'}
        </Typography>

        <form onSubmit={handleVerifyOtp}>
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 3 }}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isVerifying || isResending} // Prevent double clicks
            sx={{
              py: 1.4,
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "1rem",
              background: "linear-gradient(135deg, #1976d2, #0d47a1)",
              boxShadow: "0 6px 25px rgba(13, 71, 161, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #1565c0, #0d47a1)",
              },
            }}
          >
            {isVerifying ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
          </Button>
        </form>

        <Button
          fullWidth
          onClick={handleResendOtp}
          variant="outlined"
          disabled={isVerifying || isResending} // Prevent resending while verifying
          sx={{
            py: 1.4,
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "1rem",
            background: "#1976d2",
            color: "#fff",
            mt: 2,
            "&:hover": {
              background: "#1565c0",
            },
          }}
        >
          {isResending ? <CircularProgress size={24} color="inherit" /> : "Resend OTP"}
        </Button>
      </Paper>
    </Box>
  );
};

export default VerifyOtp; 