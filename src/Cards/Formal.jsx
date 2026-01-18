import React, {useState,useEffect} from 'react'
import './Cards.css'
import UploadForm from './UploadForm';

const Formal = () => {
   const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [user,setUser]=useState('');
   const [minDate, setMinDate] = useState('');
   const [selectedImage, setSelectedImage] = useState("");

  const handleCardClick = (cardTitle,price,imageUrl) => {
    setSelectedCard(cardTitle);
    setSelectedPrice(price);
    setSelectedImage(imageUrl);
    setShowForm(true);
    
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCard(null);
    setSelectedPrice(null);
    setSelectedImage(null);
  };

 useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // convert string to object
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2); // Adds 2 days to the current date

    // Format date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];

    setMinDate(formattedDate); // Set the minimum date for the date input
  }, []);

return (
  <>
    <div className='container'>
      
      <div className='card' onClick={() => handleCardClick("Formal Wear",30000,"https://i.pinimg.com/736x/f8/85/5e/f8855eca2d50a8f58091a5f2443c0e5b.jpg")}>
        <img
          src="https://i.pinimg.com/736x/f8/85/5e/f8855eca2d50a8f58091a5f2443c0e5b.jpg"
          alt="Formal wear 1"
          
        />
        <div className="card-text">
    <h3>T-shirt</h3>
    <p>₦30000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear1",45000,"imageUrl")}>
        <img 
          src="https://5.imimg.com/data5/EU/OR/MN/SELLER-34697614/l8-500x500.jpg"
          alt="Formal wear 2"
          
        />
        <div className="card-text">
    <h3> Suit</h3>
    <p>₦45000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear3",50000)}>
        <img
          src="https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/Jodhpuri-Suit.jpeg"
          alt="Formal wear 3"
          
        />
        <div className="card-text">
    <h3> Bandhgala suit</h3>
    <p>₦50000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear4")}>
        <img
          src="https://algopix.com/products/_next/image?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F31sRXiw4tIL._SL400_.jpg&w=828&q=75"
          alt="Formal wear 4"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear5")}>
        <img
          src="https://i.etsystatic.com/24512336/r/il/91d713/2502167519/il_fullxfull.2502167519_hfjx.jpg"
          alt="Formal wear 5"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear6")}>
        <img
          src="https://s.alicdn.com/@sc04/kf/H5d994cfb0e93490aa7539b53eddc4919x/H-D-African-Dashiki-Agbada-for-Men-Traditional-Outfit-Robe-3-PCS-Set-Long-Sleeve-Formal-Attire-for-Wedding-Wear.jpg"
          alt="Formal wear 6"
          
        />
            <div className="card-text">
    <h3> Agbada</h3>
    <p>₦50000</p>
  </div>
      </div>
     

    </div>

     
      {showForm && (
         <div className="modal-overlay">
          <div className="form-box">
            <h2>{selectedCard}</h2>

            <form>
  <label htmlFor="name">Customer Name</label>
  <input
    type="text"
    id="name"
    name="name"
    placeholder="Your Name"
    autoComplete="name"
    required
  />

  <label htmlFor="email">Email</label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="Email"
    autoComplete="email"
    value={user?.email || ''}
    readOnly
    required
  />
   {/* PRICE FIELD */}
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          value={`₦${selectedPrice}`}
          readOnly
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
  <label htmlFor='deadline'>Deadline</label>
  <select>
    <option value="">Select</option>
    <option value="urgent">Urgent(2-7days)</option>
    <option value="noturgent">Not Urgent (&gt; 7 days)</option>
  </select>

<label htmlFor="deliveryDate">Delivery Date</label>
  <input type="date" id="deliveryDate" name="deliveryDate" min={minDate} />
<input type="hidden" name="cardImage" value={selectedImage} />
  <label htmlFor="message">Message</label>
  <textarea
    id="message"
    name="message"
    placeholder="Input Measurement/Message"
    autoComplete="off"
  />

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