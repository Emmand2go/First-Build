import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const [booking, setBooking] = useState(null); // State to store the booking data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  // Fetch the booking data when the component mounts
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get("https://backend-dmwx.onrender.com/api/product/");
        setBooking(response.data[0]);           // Store the booking data
      } catch (err) {
        console.error("Error fetching booking data:", err);
        setError("Failed to load booking data.");
      } finally {
        setLoading(false); // Stop loading after the request finishes
      }
    };

    fetchBookingData();
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Load Paystack script dynamically
  const loadPaystackScript = () => {
    return new Promise((resolve) => {
      if (window.PaystackPop) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    if (!booking) return; // Ensure booking data is available before proceeding

    const amountInKobo = booking.price * 100;
  //    // Check if the email is valid
  // if (!booking.email || !validateEmail(booking.email)) {
  //   return alert("Invalid email address.");
  // }

    const loaded = await loadPaystackScript();
    if (!loaded) return alert("Failed to load payment gateway");

    const handler = window.PaystackPop.setup({
key: "pk_test_088dc022605cd213d2537b660f45b3fc55c8518d",
      // key: process.env.REACT_APP_PAYSTACK_PUBLIC, // live/test key
      email:"Princechisom2001@Outlook.com",                                     //booking.email,
      amount: amountInKobo,
      ref: new Date().getTime().toString(),
      onClose: function () {
        alert("Payment was not completed");
      },
    //   callback: async function (response) {
    //     // verify payment with backend
    //     try {
    //       const res = await fetch(
    //         `${process.env.REACT_APP_API_BASE_URL}/api/payments/verify`,
    //         {
    //           method: "POST",
    //           headers: { "Content-Type": "application/json" },
    //           body: JSON.stringify({ reference: response.reference }),
    //         }
    //       );
    //       const data = await res.json();
    //       if (data.status === "success") {
    //         navigate(`/progress/${data.orderId}`);
    //       } else {
    //         alert("Payment could not be verified");
    //       }
    //     } catch (err) {
    //       console.error(err);
    //       alert("Error verifying payment");
    //     }
    //   },
    // });
     callback: function (response) {
        // Payment was successful, no backend verification needed, just navigate or show a message
        console.log("Payment Successful: ", response);
        alert("Payment was successful!");
        
        // Navigate to a success page or show a success message
        navigate("/home"); // Change "/success" to whatever path you want
      },
    });

    handler.openIframe();
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an issue fetching data   .toLocaleString() in 93
  }

  return (
    <div className="payment-page">
      <h2>Make Payment</h2>
      <p>Amount: ₦{booking.price}</p>                            
      <button onClick={handlePay} className="pay-btn">
        Pay Now
      </button>
    </div>
  );
}