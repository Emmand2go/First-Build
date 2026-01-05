import React, { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import './Dashboard.css'



const studentData = {
  basicInfo: {
    fullName: 'John Doe',
    studentId: 'S123456',
    dateOfBirth: '2007-05-12',
    age: 16,
    gender: 'Male',
    profilePhoto: 'https://via.placeholder.com/150',
  },
  contactInfo: {
    address: '123 Main Street, Springfield',
    parentName: 'Jane ',
    parentPhone: '+1 234 567 890',
    parentEmail: 'jane.doe@example.com',
    emergencyContact: '+1 987 654 321',
  },
  academicInfo: {
    grade: 'SS2A',
    arm:'Science',
    classSection: '10-B',
    homeroomTeacher: 'Mrs. Smith',
    subjects: ['Mathematics', 'English','Chemistry','Physics','Biology', 'Computer Sci.', 'Civic Education'],
    gpa: 3.8,
    attendance: '95%',
  },
  schoolRecords: {
    admissionDate: '2018-09-01',
    previousSchools: ['Springfield Middle School'],
    status: 'Active',
    disciplinaryRecord: 'None',
  },
  additionalInfo: {
    extracurriculars: ['Basketball', 'Chess Club', 'Debate Team'],
    awards: ['Math Olympiad Winner 2023', 'Science Fair 2nd Place 2022'],
    healthInfo: 'No known allergies',
  },
};


const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
  const navigate = useNavigate();
  const title = user?.gender?.toLowerCase() === "female" ? "Ms." : "Mr.";
  const { basicInfo, contactInfo, academicInfo, schoolRecords, additionalInfo } = studentData;
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');

    // Check if user data exists
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the stored user data to an object
    } else {
      // Redirect to login if no user data is found
      navigate('/'); // Or use React Router to navigate
    }
  }, []);

    // Handle sidebar toggle (for mobile responsiveness)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/'); // Or use window.location.href for non-React Router projects
    // Remove the user and token from localStorage
    
    
  };

  return (
    <div className="dashboard-container">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      {/* <button onClick={handleLogout}>Logout</button> */}
     <div className="main-content">
      <img style={{height:'5rem'}}   src="/3d-boy.png" alt="Loading image.." />
      <div className="dashboard-header">
        {/* <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button> */}
      {!user?
      (<h1>Loading user...</h1>):
      (<h1>Welcome {title},{user.firstName}</h1>)}
       <button style={{marginLeft:"30px"}} className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
      </div>
         {/* <Route path="/" element={<Profile user={user} />} /> Default landing page */}
          {/* <Route path="/profile" element={<Profile user={user} />} /> */}

          {/* Basic Info */}
      <section className="card">
        <h2>Basic Information</h2>
        <img src={basicInfo.profilePhoto} alt="Profile" className="profile-photo" />
        <p><strong>Full Name:</strong> {user.lastName} {user.firstName}</p>
        <p><strong>Student ID:</strong> FGGC/{user._id}</p>
        <p><strong>Date of Birth:</strong> {basicInfo.dateOfBirth}</p>
        <p><strong>Age:</strong> {basicInfo.age}</p>
        <p><strong>Gender:</strong> {basicInfo.gender}</p>
      </section>

      {/* Contact Info */}
      <section className="card">
        <h2>Contact Information</h2>
        <p><strong>Address:</strong> {contactInfo.address}</p>
        <p><strong>Parent/Guardian:</strong> {contactInfo.parentName} {user.lastName}</p>
        <p><strong>Phone:</strong> {contactInfo.parentPhone}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Emergency Contact:</strong> {contactInfo.emergencyContact}</p>
      </section>

      {/* Academic Info */}
      <section className="card">
        <h2>Academic Information</h2>
        <p><strong>Class:</strong> {academicInfo.grade}</p>
        <p><strong>ARM:</strong> {academicInfo.arm}</p>
        <p><strong>Section:</strong>2025-2026</p>
        <p><strong>Homeroom Teacher:</strong> {academicInfo.homeroomTeacher}</p>
        <p><strong>Subjects:</strong> {academicInfo.subjects.join(', ')}</p>
        <p><strong>CGPA:</strong> {academicInfo.gpa}</p>
        <p><strong>Attendance:</strong> {academicInfo.attendance}</p>
      </section>

      {/* School Records */}
      <section className="card">
        <h2>School Records</h2>
        <p><strong>Admission Date:</strong> {schoolRecords.admissionDate}</p>
        <p><strong>Previous Schools:</strong> {schoolRecords.previousSchools.join(', ')}</p>
        <p><strong>Status:</strong> {schoolRecords.status}</p>
        <p><strong>Disciplinary Record:</strong> {schoolRecords.disciplinaryRecord}</p>
      </section>

      {/* Additional Info */}
      <section className="card">
        <h2>Additional Information</h2>
        <p><strong>Extracurricular Activities:</strong> {additionalInfo.extracurriculars.join(', ')}</p>
        <p><strong>Awards:</strong> {additionalInfo.awards.join(', ')}</p>
        <p><strong>Health Information:</strong> {additionalInfo.healthInfo}</p>
      </section>

      </div> 
    </div>
  )
};

// // Profile Component
// const Profile = ({ user }) => {
//   return (
//     <div>
//       {user ? (
//         <>
//           <h2>Welcome, {user.firstName}!</h2>
//           <p>This is your profile page.</p>
//         </>
//       ) : (
//         <h3>Loading user information...</h3>
//       )}
//     </div>
//   );};

export default Dashboard
