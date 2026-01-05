import React, {useState,useEffect} from 'react'
import './Cards.css'

const Formal = () => {
   const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [user,setUser]=useState('');
   const [minDate, setMinDate] = useState('');

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCard(null);
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
      
      <div className='card' onClick={() => handleCardClick("Formal Wear")}>
        <img
          src="https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
          alt="Formal wear 1"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear1")}>
        <img
          src="https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg"
          alt="Formal wear 2"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear3")}>
        <img
          src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg"
          alt="Formal wear 3"
          
        />
        <div className="card-text">
    <h3>Formal Wear</h3>
    <p>Elegant styles for special occasions</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear4")}>
        <img
          src="https://images.pexels.com/photos/593570/pexels-photo-593570.jpeg"
          alt="Formal wear 4"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear5")}>
        <img
          src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg"
          alt="Formal wear 5"
          
        />
      </div>

      <div className='card' onClick={() => handleCardClick("Formal Wear6")}>
        <img
          src="https://images.pexels.com/photos/3775535/pexels-photo-3775535.jpeg"
          alt="Formal wear 6"
          
        />
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
    <option value="noturgent">Not Urgent(>7days)</option>
  </select>

<label htmlFor="deliveryDate">Delivery Date</label>
  <input type="date" id="deliveryDate" name="deliveryDate" min={minDate} />

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