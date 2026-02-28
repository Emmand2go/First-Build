import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cards.css"

const UploadForm = () => {
  
  const { id:customImageId } = useParams();
  
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [minDate, setMinDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [basePrice, setBasePrice] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const [order, setOrder] = useState(null);
  const [processing, setProcessing] = useState(false);
  const closeForm = () => {
  navigate("/uploads", { replace: true }); // or navigate(-1) if you want to go back
};
  

  // ✅ Load user + set minimum date
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    setMinDate(currentDate.toISOString().split("T")[0]);
  }, []);

  // ✅ Poll backend when processing starts
  useEffect(() => {
    if (!processing) return;

    const interval = setInterval(async () => {
      
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/custom-image/${customImageId}`
        );

        const updatedOrder = res.data.order;
        if (!updatedOrder) return;
        setOrder(updatedOrder);

        if (updatedOrder.status === "ready") {
          setBasePrice(updatedOrder.price);
        setSelectedPrice(updatedOrder.price);
          sessionStorage.setItem(
            "price_form",
            JSON.stringify(updatedOrder)
          );

          clearInterval(interval);
          navigate("/pay", { replace: true });
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval); // stop polling on error
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [processing, customImageId, navigate]);

  const handleDateChange = (e) => {
    if (basePrice === null) return; // 🚫 don't update if price not loaded
    const selectedDate = new Date(e.target.value);
    const minAllowedDate = new Date(minDate);

    selectedDate.setHours(0, 0, 0, 0);
    minAllowedDate.setHours(0, 0, 0, 0);

    const diffInDays =
      (selectedDate - minAllowedDate) / (1000 * 60 * 60 * 24);

    if (diffInDays <= 5) {
      setSelectedPrice(basePrice + 20000);
    } else {
      setSelectedPrice(basePrice);
    }
  };

  // ✅ Submit → Save → Start Processing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    sessionStorage.removeItem("price");

    try {
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData.entries());

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/order/save-details/${customImageId}`,
        payload
      );

      if (!res.data.success) {
        setErrorMessage("Failed to save details.");
        return;
      }


      // 🚀 Start polling
      setProcessing(true);

    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };
  // http://localhost:5173/details-form/69a259f6f13adf477b0d3b1a

  // ✅ Show processing screen
  if (!processing) {
    return (
      <div className="modal-overlay">
        <div className="form-box">
          <div className="spinner"></div>
          <h3 style={{ color: "red" }}>Checking Submission...</h3>
          <p style={{ color: "blue" }}>Please wait and check back within 24hrs...</p>
        </div>
      </div>
    );
  }


  return (
      <div className="modal-overlay">
          <div className="form-box">
            <h2>Details form</h2>

                   <form onSubmit={handleSubmit}>
  <label htmlFor="name">Customer Name(Male only)</label>
  <input
    type="text"
    id="fullName"
    name="fullName"
    placeholder="Your Name"
    autoComplete="off"
    required
  />

  {/* <label htmlFor="email">Email</label> */}
  <input
    type="hidden"
    id="email"
    name="email"
    placeholder="Email"
    autoComplete="email"
    value={user?.user?.Email || "" }
    readOnly
    required
  />

 <label htmlFor="ageGroup">Age Group</label>
  <select id="ageGroup" name="ageGroup" required>
    <option value="">Select Age Group</option>
    
    <optgroup label="Children">
      <option value="toddler">Toddler (0-5)</option>
      <option value="child">Child (6-12)</option>
    </optgroup>

    <optgroup label="Adults">
      <option value="teenager">Teenager (13-19)</option>
      <option value="adult">Adult (20+)</option>
    </optgroup>
  </select>
    {/* PRICE FIELD */}
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="finalPrice"
          value={selectedPrice !== null ? `₦${selectedPrice.toLocaleString()}` : "Loading..."}
          readOnly
        />
        {selectedPrice > basePrice && (
  <p style={{ color: "red" }}>
    Rush fee of ₦20,000 applied (delivery within 5 days)
  </p>
)}

<input type="hidden" name="basePrice" value={`₦${basePrice}`} />

<label htmlFor="deliveryDate">Delivery Date</label>
  <input type="date" id="deliveryDate" name="deliveryDate" min={minDate} onChange={handleDateChange} />


  {errorMessage && (
  <p style={{ color: "red", marginBottom: "10px" }}>
    {errorMessage}
  </p>
)}

  <button type="submit">Submit</button>
  <button type="button" onClick={closeForm}>Close</button>
</form>
          </div>
        </div>
  )
}

export default UploadForm




// const handleSubmit = async (e) => {
//           e.preventDefault();
//           setErrorMessage(""); // clear previous errors
//       try {
//         const formData = new FormData(e.target);
      
//         const payload = Object.fromEntries(formData.entries());
//         const token=localStorage.getItem("token");
//         const res = await axios.put(
//           `${import.meta.env.VITE_BASE_URL}/api/order/save-details/${customImageId}`,payload
//         );

//         if (!res.data.success) {
//           navigate("/uploads", { replace: false });
//         }
//       } catch (err) {
//         navigate("/uploads", { replace: true });
//       }
//     };

//     handleSubmit();    
//       }, [customImageId, navigate]);