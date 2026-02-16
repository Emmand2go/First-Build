import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/reset-password/${token}`, { newPassword });
      setMessage(res.data.message);
      setLoading(false);

      // redirect to login after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
      <Paper sx={{ p: 4, width: { xs: "90vw", sm: 400 }, borderRadius: "20px" }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Reset Password</Typography>
        {message && <Typography color="success.main">{message}</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            inputProps={{ minLength: 6 }}
            sx={{ mb: 2 }}
          />
          <Button fullWidth type="submit" variant="contained">
            {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;