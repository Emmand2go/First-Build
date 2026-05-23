import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function PaymentPage() {
  const [booking, setBooking] = useState(null); // State to store the booking data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();
  
  

  // Fetch the booking data when the component mounts
  // useEffect(() => {
  //   const fetchBookingData = async () => {
  //     try {
  //       const response = await axios.get("https://backend-dmwx.onrender.com/api/product/");
  //       // const response = await axios.get("http://localhost:4000/api/product/");
  //       setBooking(response.data[0]);           
  //     } catch (err) {
  //       console.error("Error fetching booking data:", err);
  //       setError("Failed to load booking data.");
  //     } finally {
  //       setLoading(false); // Stop loading after the request finishes
  //     }
  //   };

  //   fetchBookingData();
  // }, []); // Empty dependency array means this runs only once when the component mounts

  useEffect(() => {
    // const booking =sessionStorage.getItem("price");
    const priceFromUpload = sessionStorage.getItem("price");
    const priceFromForm = sessionStorage.getItem("price_form");

    // Use || to pick whichever one exists
    const booking = priceFromUpload || priceFromForm;

    if (!booking) {
      console.error("No price data found!");
      navigate("/home"); // Send them back if nothing is found
      return;
    }
    console.log(booking);
    
    if (booking) {
    setBooking(JSON.parse(booking));
  } else {
    setError("Failed to retrieve data");
    console.log("No booking found in sessionStorage");
  };
  setLoading(false);

  //   if (!booking) {
  //     setError("Failed to retrieve data");
  // //     // user came here directly → send back
  // //     navigate("/");
  //   } else {
  //     setBooking(JSON.parse(booking));
  //   }
  }, []);
  // if (!booking) return null;

  // Load Paystack script dynamically
  const loadPaystackScript = () => {
    return new Promise((resolve) => {
      if (window.PaystackPop) return resolve(true);
      const script = document.createElement("script");
      script.src  = "https://js.paystack.co/v2/inline.js";
script.async = true;
//  // 👇 IMPORTANT if your CSP uses nonces
//     const nonce = document
//       .querySelector('meta[name="csp-nonce"]')
//       ?.getAttribute("content");

//     if (nonce) {
//       script.setAttribute("nonce", nonce);
//     }

      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };


  const handlePay = async () => {
  try {
    if (!booking || !booking.finalPrice) {
      return alert("Booking data missing.");
    }

    const loaded = await loadPaystackScript();
    if (!loaded) return alert("Failed to load Paystack");

    const PaystackPop = window.PaystackPop;
    
    if (!PaystackPop) {
        return alert("Paystack SDK not found. Please refresh.");
    }

    // Initialize Paystack V2
    const paystack = new window.PaystackPop();

    paystack.newTransaction({
      key: import.meta.env.VITE_APP_PAYSTACK_PUBLIC,
      email: booking?.email,
      amount: Math.round(booking.finalPrice * 100),
      ref: String(booking.paymentReference),
      
      // V2 uses 'onSuccess' instead of 'callback'
      onSuccess: async (transaction) => {
        // 'transaction' contains { reference, status, trans, message }
        console.log("Success! Reference:", transaction.reference);
        
        try {
          const verifyRes = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/order/verify`,
            { reference: transaction.reference }
          );

          if (verifyRes.status === 200) {
            alert("Payment verified!");
            sessionStorage.removeItem("price");
             sessionStorage.setItem("paymentRef", transaction.reference);
            navigate("/chart/:email");
            // navigate(`/chart/${verifyRes.data.order._id}`);
          }
        } catch (error) {
          console.error("Verification error:", error);
          alert("Payment was successful, but server verification failed.");
        }
      },

      // V2 uses 'onCancel' instead of 'onClose'
      onCancel: () => {
        alert("Payment cancelled.");
      },

      // // You can also add metadata here for your backend
      // metadata: {
      //   custom_fields: [
      //     {
      //       display_name: "Order ID",
      //       variable_name: "order_id",
      //       value: booking._id // example
      //     }
      //   ]
      // }
    });

  } catch (err) {
    console.error("V2 Initialization Error:", err);
    alert("Could not open payment window.");
  }
};

//   const handlePay = async () => {
//     try{
//     // if (!booking) return; // Ensure booking data is available before proceeding

//     const amountInKobo = booking.finalPrice * 100;
//   //    // Check if the email is valid
//   // if (!booking.email || !validateEmail(booking.email)) {
//   //   return alert("Invalid email address.");
//   // }

//     const loaded = await loadPaystackScript();
//     if (!loaded) return alert("Failed to load payment gateway");


//    const onSuccess = async (response) => {
//       console.log("Payment successful, verifying reference:", response.reference);
//       try {
//         const verifyRes = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/api/order/verify`,
//           { reference: response.reference }
//         );

//         if (verifyRes.status === 200) {
//           alert("Payment verified successfully!");
//           sessionStorage.removeItem("price");
//           navigate("/chart");
//         }
//       } catch (error) {
//         console.error("Verification error:", error);
//         alert("Payment was successful, but verification failed. Please check your dashboard.");
//       }
//     };

//     // 5. Initialize the Paystack Setup
//     const handler = window.PaystackPop.setup({
//       key: import.meta.env.VITE_APP_PAYSTACK_PUBLIC,
//       email: booking?.email || "customer@email.com", // Fallback email if missing
//       amount: amountInKobo,
//       ref: String(booking.paymentReference), // Ensure reference is a string
//       callback: onSuccess,
//       onClose: function () {
//         alert("Payment window closed.");
//       },
//     });

//     // 6. Open the payment modal
//     handler.openIframe();

//   } catch (err) {
//     console.error("Paystack Setup Error:", err);
//     alert("Could not initialize Paystack. Check your connection or API key.");
//   }
// };



  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an issue fetching data   .toLocaleString() in 93
  };

  return (
    <div className="payment-page">
      <h2>Make Payment</h2>
      <p>Amount: ₦{booking?.finalPrice ||60000}</p>                            
      <button onClick={handlePay} className="pay-btn">
        Pay Now
      </button>
    </div>
  );
}

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
    //  callback: function (response) {
    //     // Payment was successful, no backend verification needed, just navigate or show a message
    //     console.log("Payment Successful: ", response);
    //     alert("Payment was successful!");
        
    //     // Navigate to a success page or show a success message
    //     navigate("/home"); // Change "/success" to whatever path you want
    //   },

     // 3️⃣ VERIFY AFTER SUCCESS
//       callback: async function (response) {
//         try {
//           const verifyRes = await axios.post(
//             `${import.meta.env.VITE_BASE_URL}/api/order/verify`,
//              { reference: response.reference }
//           );
// console.log("Verify payment response:", verifyRes);
//           if (verifyRes.data.order.paymentStatus === "paid") {
//             alert("Payment verified successfully!");

//             // Optional: clear session storage
//             sessionStorage.removeItem("price");

//             navigate("/chart");
//           } else {
//             alert("Payment verification failed");
//           }
//         } catch (error) {
//           console.error(error);
//           alert("Error verifying payment");
//         }
//       },
//     });