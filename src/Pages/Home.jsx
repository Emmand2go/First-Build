import React, { useEffect, useState } from 'react'
import CategoryCard from "./CategoryCard";
import { useNavigate,useParams } from 'react-router-dom';


const Home = ({isAuthenticated}) => {
  const text = "Welcome to ND Gents";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  // const [typingDone, setTypingDone] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  // const [hasTyped, setHasTyped] = useState(false);
  const navigate=useNavigate()
  // const { id } = useParams();
  // const user= localStorage.getItem("user")
  // const userId=user.id

//  // ✅ ADD THIS EFFECT HERE (reset on login)
//   useEffect(() => {
//     if (isAuthenticated) {
//       sessionStorage.removeItem("typed");
//       setDisplayText("");
//       setIndex(0);
//       setTypingDone(false);
//     }
//   }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
  // Check if typing already ran in this session
  if (sessionStorage.getItem("typed")) {
    setDisplayText(text);
    setTypingDone(true);   // cursor hidden
    return;
  }

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, 200); // typing speed

      return () => clearTimeout(timeout);
  } else {
    setTypingDone(true);
    // sessionStorage.setItem(`typed_${userId}`, "true");
    sessionStorage.setItem("typed", "true");
    
  }

}, [index, isAuthenticated,text]);
  return (
    <div>
      <section className='layer1'>
        <div className='up'>
          <h1 style={{fontSize:'4rem',color:'#ff4d4f'}} className='hero-text'>{displayText}{!typingDone && <span className="cursor">|</span>}</h1>
          <p style={{fontSize:'3rem',color:'#ff4d4f'}}>Making clothes that defines Boys/Men</p>
          <a href="#" style={{color:'white',textDecoration:'none',backgroundColor:'#ff4d4f',border:'1px',borderRadius:'2px'}}>Learn More</a>
        </div>
      </section>
      <div className="card-grid">
        <CategoryCard
          title="Formal Wears"
          images={[
            "/images12.jpg",
            "/images21.jpg",
            // "/images31.jpg",
          ]}
          onClick={() => navigate("/Formal-wears")}
        />

        <CategoryCard
          title="Native Wears"
          images={[
            "/native21.png",
            "/native31.png",
            // "/native11.png",
          ]}
          onClick={() => navigate("/native-wears")}
        />

        <CategoryCard
          title="School Uniforms"
          images={[
            "/school02.jpg",
            "/school1.png",
            // "/images/school3.jpg",
          ]}
          onClick={() => navigate("/school-uniforms")}
        />

        <CategoryCard
          title="Upload Image"
          images={[
            "/upload1.jpg",
            "/upload.jpg",
          ]}
          onClick={() => navigate("/native-wears")}
        />
      </div>
    {/* <footer className="footer">
        <p>&copy; 2026 ND Gent. All rights reserved.</p>
      </footer> */}
    </div>
  )
}

export default Home
