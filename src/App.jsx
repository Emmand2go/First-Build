import React, {useState,useEffect} from 'react'
import {BrowserRouter as Router,Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css'
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboarder/Dashboard';
import Settings from './Dashboarder/Settings'
import Results from './Dashboarder/Results';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Formal from './Cards/Formal';
import Footer from './Pages/Footer';
import PaymentPage from './Request/PaymentPage';
import ImageUpload from './Cards/ImageUpload';
import Native from './Cards/Native';
import Schuni from './Cards/Schuni';

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
const location = useLocation();  // <-- detect current route
// const onRegisterPage= location.pathname==="/register";
const onRegisterPage = location.pathname.startsWith("/register");

// Check if user is already logged in (persist login)
useEffect(() => {
    // const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
    {/* {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated}/>}  this was not allowing navbar show when redirected*/}
<Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
{/* Content wrapper: becomes blurred + unclickable */}
      <div className={`content-wrapper ${!isAuthenticated && !onRegisterPage ? "disabled" : ""}`}>
      <Routes>
        {/* <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} /> */}
        <Route path="/register/*" element={<Register/>}/>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path='/pay' element={<PaymentPage/>}/>
{isAuthenticated ?(
    <>
  <Route path='/home' element={<Home isAuthenticated={isAuthenticated}/>}/>
  <Route path='/about' element={<About/>}/>
 {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
 <Route path="/settings" element={<Settings />} />
   <Route path="/result" element={<Results />} />
   <Route path='/Formal-wears' element={<Formal/>}/>
   <Route path='/uploads' element={<ImageUpload/>}/>
   <Route path='/native-wears' element={<Native/>}/>
   <Route path='/school-uniforms' element={<Schuni/>}/>
  </>
  ):(<Route path="*" element={<Navigate to="/" />} />)
  }
      </Routes>
      </div>
   {!isAuthenticated && !onRegisterPage &&(   <Login onLoginSuccess={() => setIsAuthenticated(true)}/>)}
    <Footer/>
    </>
  );
}

export default App
