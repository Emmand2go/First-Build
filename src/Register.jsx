import React, {useState} from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate =useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')
const payload ={firstName, lastName, email, password, address, phoneNumber}
const handleRegister = async (e) =>{
  e.preventDefault()
  setLoading(true)
  setError('')
  try{
    const res= await axios.post('https://students-learning-api.onrender.com/api/auth',payload)
    console.log(res)
navigate('/')
} catch(error){
  console.error(error.response.data.error)
  setError(error.response.data.error)
  setLoading(false)
}
}
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 3, color: "#0d47a1", textAlign: "center" }}
          >
           {error ? error: 'Create Account'}
          </Typography>

          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e)=> setFirstName(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e)=> setLastName(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e)=> setPhoneNumber(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={address}
              onChange={(e)=> setAddress(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
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
              {loading? <CircularProgress size={24} color="inherit" />: "Register"}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#1976d2",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login
            </a>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register;