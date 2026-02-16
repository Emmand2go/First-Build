import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const normalized=Email?.trim().toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/forgot-password`, { Email:normalized });
      setMessage(res.data.message);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
      <Paper sx={{ p: 4, width: { xs: "90vw", sm: 400 }, borderRadius: "20px" }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Forgot Password</Typography>
        {message && <Typography color="success.main">{message},check spam folder.</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button fullWidth type="submit" variant="contained">
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;