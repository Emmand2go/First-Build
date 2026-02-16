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

// const Register = () => {
//   const navigate =useNavigate();
//   const [Email, setEmail] = useState('')
//   const [Password, setPassword] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [firstName, setFirstName] = useState('')
//   const [PhoneNo, setPhoneNumber] = useState('')
//   const [Address, setAddress] = useState('')
//   const [loading, setLoading] = useState('')
//   const [error, setError] = useState('');
//   // Concatenate firstName and lastName into a full Name
//   const Name = `${firstName} ${lastName}`.trim();

// const payload ={Name, Email, Password, Address, PhoneNo}
// const handleRegister = async (e) =>{
//   e.preventDefault()
//   setLoading(true)
//   setError('')
//   try{
//     // const res= await axios.post('https://students-learning-api.onrender.com/api/auth',payload)
//     const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`)
//     console.log(res)
// navigate('/')
// } catch(error){
//   console.error(error.response.data.error)
//   setError(error.response.data.error)
//   setLoading(false)
// }
// }
//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #1565c0, #42a5f5)",
//         p: 2,
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 40 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <Paper
//           elevation={12}
//           sx={{
//             p: 4,
//             width: { xs: "90vw", sm: 420 },
//             borderRadius: "20px",
//             background: "rgba(255, 255, 255, 0.95)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
//           }}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             sx={{ mb: 3, color: "#0d47a1", textAlign: "center" }}
//           >
//            {error ? error: 'Create Account'}
//           </Typography>

//           <form onSubmit={handleRegister}>
//             <TextField
//               fullWidth
//               label="First Name"
//               name="firstName"
//               value={firstName}
//               onChange={(e)=> setFirstName(e.target.value)}
//               sx={{ mb: 2 }}
//               required
//             />

//             <TextField
//               fullWidth
//               label="Last Name"
//               name="lastName"
//               value={lastName}
//               onChange={(e)=> setLastName(e.target.value)}
//               sx={{ mb: 2 }}
//               required
//             />

//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               type="email"
//               value={Email}
//               onChange={(e)=> setEmail(e.target.value)}
//               sx={{ mb: 2 }}
//               required
//             />

//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               value={Password}
//               onChange={(e)=>setPassword(e.target.value)}
//               sx={{ mb: 2 }}
//               required
//             />

//             <TextField
//               fullWidth
//               label="Phone Number"
//               name="phoneNumber"
//               value={PhoneNo}
//               onChange={(e)=> setPhoneNumber(e.target.value)}
//               sx={{ mb: 2 }}
//               required
//             />

//             <TextField
//               fullWidth
//               label="Address"
//               name="address"
//               value={Address}
//               onChange={(e)=> setAddress(e.target.value)}
//               sx={{ mb: 3 }}
//               required
//             />

//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               sx={{
//                 py: 1.4,
//                 fontWeight: "bold",
//                 borderRadius: "12px",
//                 textTransform: "none",
//                 fontSize: "1rem",
//                 background: "linear-gradient(135deg, #1976d2, #0d47a1)",
//                 boxShadow: "0 6px 25px rgba(13, 71, 161, 0.4)",
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #1565c0, #0d47a1)",
//                 },
//               }}
//             >
//               {loading? <CircularProgress size={24} color="inherit" />: "Register"}
//             </Button>
//           </form>

//           <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
//             Already have an account?{" "}
//             <a
//               href="/login"
//               style={{
//                 color: "#1976d2",
//                 fontWeight: 600,
//                 textDecoration: "none",
//               }}
//             >
//               Login
//             </a>
//           </Typography>
//         </Paper>
//       </motion.div>
//     </Box>
//   );
// };



const Register = () => {
  const navigate = useNavigate();

  // Step 1: Registration fields
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [PhoneNo, setPhoneNo] = useState('');
  const [Address, setAddress] = useState('');
  const normalizedEmail=Email.trim().toLowerCase();

  // Step 2: OTP fields
  // const [otp, setOtp] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [step, setStep] = useState(1);  // 1 = Register, 2 = OTP

  // Concatenate firstName and lastName into a full Name
  const Name = `${firstName} ${lastName}`.trim();

  // Payload for registration
  const payload = { Name, Email:normalizedEmail, Password, Address, PhoneNo };

  // Register new user (send OTP)
  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response=await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/register`,
      payload
    );

    setLoading(false);
console.log("Success:", response.data);
    // Go to OTP page and pass email
    navigate("/verify-otp", { state: { Email:normalizedEmail } });
  } catch (error) {
    setLoading(false);
console.error("Registration Error:", error.response?.data);
    setError(error.response?.data?.error || "Registration failed");
  }
};

  //     // Show success message and go to OTP verification step
  //     setError('');
  //     setStep(2);
  //   } catch (error) {
  //     setLoading(false);
  //     setError(error.response?.data?.error || 'Registration failed');
  //   }
  // };

  // Verify OTP (step 2)
  // const handleVerifyOtp = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //     const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/verify-email`, {
  //       Email,
  //       otp
  //     });
  //     setLoading(false);

  //     // Redirect to login or dashboard on success
  //     navigate('/');
  //   } catch (error) {
  //     setLoading(false);
  //     setError(error.response?.data?.error || 'OTP verification failed');
  //   }
  // };

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
            {error ? error : 'Create Account'}
          </Typography>

          
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
                required
                inputProps={{ minLength: 6 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={PhoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 3 }}
                required
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
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </Button>
            </form>
          

          {/* {step === 2 && (
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
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
              </Button>
            </form>
          )} */}

          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
            Already have an account?{" "}
            <a
              href="/"
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


