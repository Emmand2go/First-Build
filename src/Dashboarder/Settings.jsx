import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Settings.css'
// Assuming you have a component library (like Material UI or Bootstrap) 
// for better styling, but using basic HTML/CSS here.

// --- Dummy Functions for API Interaction ---
// In a real app, these would be 'axios.post' or 'fetch' calls to your backend.

const api = {
  processPayment: (details) => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Processing payment for:", details);
        resolve({ success: true, message: "Payment successful!" });
      }, 1500);
    });
  },
  updatePassword: (oldPass, newPass) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (oldPass !== "correct-old-password") {
          resolve({ success: false, message: "Incorrect old password." });
        } else {
          console.log("Password updated.");
          resolve({ success: true, message: "Password changed successfully!" });
        }
      }, 1500);
    });
  },
  updateProfile: (data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Profile data updated:", data);
        resolve({ success: true, message: "Profile updated successfully!" });
      }, 1500);
    });
  }
};

// --- Components for Each Feature ---

/**
 * 💳 School Fees Payment Component
 */
const PaymentSection = () => {
  const [feeAmount, setFeeAmount] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const result = await api.processPayment({ amount: feeAmount, card: cardDetails });

    setMessage(result.message);
    setLoading(false);
    if (result.success) {
      setFeeAmount('');
      setCardDetails({ number: '', expiry: '', cvv: '' });
    }
  };

  return (
    <form onSubmit={handlePay} className="payment-form">
      <h3>School Fees Payment</h3>
      <input
        type="number"
        placeholder="Fee Amount Due"
        value={feeAmount}
        onChange={(e) => setFeeAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Card Number"
        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Fees'}
      </button>
      {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
    </form>
  );
};

// ---

/**
 * 🔑 Change Password Component
 */
const PasswordSection = () => {
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("New passwords don't match.");
      setLoading(false);
      return;
    }
 if (passwords.newPassword.length < 8) {
      setMessage('New password must be at least 8 characters.');
      return;
    }

    try {
      // Example: fetch token from localStorage — replace with your auth logic
      // const token = localStorage.getItem('user');
      const response = await axios.post(
        'https://students-learning-api.onrender.com/api/auth/update', // <- change to your backend route
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        },
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     ...(token ? { Authorization: `Bearer ${token}` } : {})
        //   }
        // }
      );
    // const result = await api.updatePassword(passwords.oldPassword, passwords.newPassword);//change here
     // Adjust according to your backend response shape
      if (response.data) {
        setMessage(response.data.message || 'Password changed successfully!');
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage(response.data?.message || 'Failed to change password.');
      }
    } catch (err) {
      // Provide helpful error messages based on server reply where possible
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('An error occurred while updating password.');
      }
    } finally {
      setLoading(false);
    }
  };

   return (
    <form onSubmit={handleSubmit} className="password-form">
      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="Old Password"
        value={passwords.oldPassword}
        onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={passwords.newPassword}
        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={passwords.confirmPassword}
        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Change Password'}
      </button>
      {message && <p className={message.toLowerCase().includes('success') ? 'success' : 'error'}>{message}</p>}
    </form>
  );
};

// ---

/**
 * 👤 Profile Update Component
 */
const ProfileSection = () => {
  // In a real app, 'initialProfileData' would come from an API call upon component load
  const initialProfileData = { name: 'John Doe', email: 'john.doe@uni.edu', phone: '123-456-7890' };
  const [profile, setProfile] = useState(initialProfileData);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Filter out fields that haven't changed before sending to API
    const updatedFields = Object.keys(profile).reduce((acc, key) => {
      if (profile[key] !== initialProfileData[key]) {
        acc[key] = profile[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      setMessage("No changes detected.");
      setLoading(false);
      return;
    }

    const result = await api.updateProfile(updatedFields);

    setMessage(result.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleProfile} className="profile-form">
      <h3>Update Profile Information</h3>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Update Profile'}
      </button>
      {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
    </form>
  );
};

// --- Main Settings Component ---

/**
 * The main container component for all student settings.
 */
const Settings = () => {
  const [activeTab, setActiveTab] = useState('payment'); // 'payment', 'password', or 'profile'

  const renderContent = () => {
    switch (activeTab) {
      case 'payment':
        return <PaymentSection />;
      case 'password':
        return <PasswordSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <PaymentSection />;
    }
  };

  return (
    <div className="settings-container">
      <h1>Student Settings</h1>
      
      <div className="tab-navigation">
        <button 
          className={activeTab === 'payment' ? 'active' : ''}
          onClick={() => setActiveTab('payment')}
        >
          💳 Pay Fees
        </button>
        <button 
          className={activeTab === 'password' ? 'active' : ''}
          onClick={() => setActiveTab('password')}
        >
          🔑 Change Password
        </button>
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          👤 Update Profile
        </button>
      </div>

      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
};




export default Settings;
// --- You'd also need CSS styles for classes like .settings-container, .tab-navigation, .active, etc.
