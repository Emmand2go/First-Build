import React, {useState,useEffect} from 'react'
import './Cards.css'
import UploadForm from './UploadForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Formal = () => {
   const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [user,setUser]=useState('');
   const [minDate, setMinDate] = useState('');
   const [selectedImage, setSelectedImage] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const navigate=useNavigate();

  const handleCardClick = (cardTitle,price,imageUrl) => {
    setSelectedCard(cardTitle);
    setSelectedPrice(price);
    setBasePrice(price);
    setSelectedImage(imageUrl);
    setShowForm(true);
    
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCard(null);
    setSelectedPrice(null);
    setBasePrice(null);
    setSelectedImage(null);
    setErrorMessage(null);
  };

 useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));  // convert string to object

    if (storedUser) {
      setUser(storedUser);  
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2); // Adds 2 days to the current date

    // Format date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];

    setMinDate(formattedDate); // Set the minimum date for the date input
  }, []);

  const handleDateChange = (e) => {
  const selectedDate = new Date(e.target.value);
  const minAllowedDate = new Date(minDate);

  // remove time for accurate day difference
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

const handleSubmit = async (e) => {
  e.preventDefault();
setErrorMessage(""); // clear previous errors
try{
  const formData = new FormData(e.target);

  const payload = Object.fromEntries(formData.entries());

  const res = await axios.post("/api/calculate-price", payload);

  sessionStorage.setItem("price", res.data);
  navigate("/pay");

} catch (error) {
    console.error(error);

    // Show user-friendly error
    if (error.response?.data?.message) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }
};
return (
  <>
    <div className='container'>
      
      <div className='card' onClick={() => handleCardClick("T-shirt",30000,"https://i.pinimg.com/736x/f8/85/5e/f8855eca2d50a8f58091a5f2443c0e5b.jpg")}>
        <img
          src="https://i.pinimg.com/736x/f8/85/5e/f8855eca2d50a8f58091a5f2443c0e5b.jpg"
          alt="Formal wear 1"
          
        />
        <div className="card-text">
    <p>₦30000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Suit",45000,"https://5.imimg.com/data5/EU/OR/MN/SELLER-34697614/l8-500x500.jpg")}>
        <img 
          src="https://5.imimg.com/data5/EU/OR/MN/SELLER-34697614/l8-500x500.jpg"
          alt="Formal wear 2"
          
        />
        <div className="card-text">
    <p>₦45000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Bandhgala suit",50000,"https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/Jodhpuri-Suit.jpeg")}>
        <img
          src="https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/Jodhpuri-Suit.jpeg"
          alt="Formal wear 3"
          
        />
        <div className="card-text">
    <p>₦50000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear4",35000,"https://algopix.com/products/_next/image?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F31sRXiw4tIL._SL400_.jpg&w=828&q=75")}>
        <img
          src="https://algopix.com/products/_next/image?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F31sRXiw4tIL._SL400_.jpg&w=828&q=75"
          alt="Formal wear 4"
          
        />
               <div className="card-text">
    <p>₦35000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear5",60000,"https://i.etsystatic.com/24512336/r/il/91d713/2502167519/il_fullxfull.2502167519_hfjx.jpg")}>
        <img
          src="https://i.etsystatic.com/24512336/r/il/91d713/2502167519/il_fullxfull.2502167519_hfjx.jpg"
          alt="Formal wear 5"
          
        />
               <div className="card-text">
    <p>₦60000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Agbada",50000,"https://s.alicdn.com/@sc04/kf/H5d994cfb0e93490aa7539b53eddc4919x/H-D-African-Dashiki-Agbada-for-Men-Traditional-Outfit-Robe-3-PCS-Set-Long-Sleeve-Formal-Attire-for-Wedding-Wear.jpg")}>
        <img
          src="https://s.alicdn.com/@sc04/kf/H5d994cfb0e93490aa7539b53eddc4919x/H-D-African-Dashiki-Agbada-for-Men-Traditional-Outfit-Robe-3-PCS-Set-Long-Sleeve-Formal-Attire-for-Wedding-Wear.jpg"
          alt="Formal wear 6"
          
        />
            <div className="card-text">
    <p>₦50000</p>
  </div>
      </div>
     

    </div>

     
      {showForm && (
         <div className="modal-overlay">
          <div className="form-box">
            <h2>{selectedCard}</h2>

            <form onSubmit={handleSubmit}>
  <label htmlFor="name">Customer Name(Male only)</label>
  <input
    type="text"
    id="name"
    name="name"
    placeholder="Your Name"
    autoComplete="name"
    required
  />

  {/* <label htmlFor="email">Email</label> */}
  <input
    type="hidden"
    id="email"
    name="email"
    placeholder="Email"
    autoComplete="email"
    value={user?.user?.Email}
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
          value={`₦${selectedPrice}`}
          readOnly
        />
{selectedPrice > basePrice && (
  <p style={{ color: "red" }}>
    Rush fee of ₦20,000 applied (delivery within 5 days)
  </p>
)}

<label htmlFor="deliveryDate">Delivery Date</label>
  <input type="date" id="deliveryDate" name="deliveryDate" min={minDate} onChange={handleDateChange} />

<input type="hidden" name="cardImage" value={selectedImage} />
  <label htmlFor="message">Message</label>
  <textarea
    id="message"
    name="message"
    placeholder="Input Measurement/Message"
    autoComplete="off"
    required
  />

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
      )}
      </>
  );
};

{/* <button type="button" onClick={closeForm}> */}
// const styles = {
//   container: {
//     display: "flex",
//     flexWrap: "nowrap",
//     flex:"0 0 70%",
//     gap: "20px",
//     justifyContent: "center",
//     padding: "20px"
//   },
//   card: {
//     width: "250px",
//     borderRadius: "12px",
//     overflow: "hidden",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//     backgroundColor: "#fff"
//   },
//   image: {
//     width: "100%",
//     height: "300px",
//     objectFit: "cover"
//   }
// };

export default Formal



{/* <form onSubmit={handleSubmit}>
  <h2>Book Tailoring Service</h2>

  <label htmlFor="name">Full Name</label>
  <input id="name" name="name" required />

  <label htmlFor="phone">Phone Number</label>
  <input id="phone" name="phone" required />

  <label htmlFor="clothType">Cloth Type</label>
  <select id="clothType" name="clothType" required>
    <option value="">Select</option>
    <option value="shirt">Shirt</option>
    <option value="gown">Gown</option>
    <option value="suit">Suit</option>
    <option value="traditional">Traditional Wear</option>
  </select>

  <label htmlFor="measurement">Measurements</label>
  <select id="measurement" name="measurement">
    <option value="now">Provide now</option>
    <option value="later">Provide later</option>
  </select>

  <label htmlFor="deliveryDate">Delivery Date</label>
  <input type="date" id="deliveryDate" name="deliveryDate" />

  <label htmlFor="notes">Special Instructions</label>
  <textarea id="notes" name="notes" />

  <button type="submit">Proceed to Payment</button>
</form> */}