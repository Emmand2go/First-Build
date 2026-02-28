import React, {useState,useEffect} from 'react'
import './Cards.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Native = () => {
    const[showForm, setShowForm] = useState(false);
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
       setSelectedImage(imageUrl)
       setShowForm(true);
     };
   
     const closeForm = () => {
       setShowForm(false);
       setSelectedCard(null);
       setSelectedPrice(null);
       setBasePrice(null);
       setErrorMessage(null);
     };
   
    useEffect(() => {
       const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);
   
       if (storedUser) {
         setUser(storedUser); // convert string to object
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
sessionStorage.removeItemItem("price_form")
try{
  const formData = new FormData(e.target);

  const payload = Object.fromEntries(formData.entries());
  const token=localStorage.getItem("token")

  const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/order/`,payload,
     {
      headers: {
        "Authorization": `Bearer ${token}`, // <-- send token here
      }
    }
  );

  sessionStorage.setItem("price", JSON.stringify(res.data));
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
         
         <div className='card' onClick={() => handleCardClick("Isiagu",70000,"https://i.etsystatic.com/20664734/r/il/71f8d0/5424763726/il_570xN.5424763726_iuq5.jpg")}>
           <img
             src="https://i.etsystatic.com/20664734/r/il/71f8d0/5424763726/il_570xN.5424763726_iuq5.jpg"
             alt="Native wear 1"
             
           />
           <div className="card-text">
       <p>₦70000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Ankara",45000,"https://i0.wp.com/www.zedighana.com/wp-content/uploads/2023/12/zedi_dirty_december-0083--scaled-e1702932248120.jpg?fit=1557%2C1527&ssl=1")}>
           <img
             src="https://i0.wp.com/www.zedighana.com/wp-content/uploads/2023/12/zedi_dirty_december-0083--scaled-e1702932248120.jpg?fit=1557%2C1527&ssl=1"
             alt="Native wear 2"
             
           />
           <div className="card-text">
       <p>₦45000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Kaftan",50000,"https://i.pinimg.com/736x/3b/02/b0/3b02b0b7fd62767d58af197f311e881b.jpg")}>
           <img
             src="https://i.pinimg.com/736x/3b/02/b0/3b02b0b7fd62767d58af197f311e881b.jpg"
             alt="Native wear 3"
             
           />
           <div className="card-text">
       <p>₦50000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Agbada",60000,"https://i.etsystatic.com/60730498/r/il/c28548/7083527725/il_fullxfull.7083527725_qklb.jpg")}>
           <img
             src="https://i.etsystatic.com/60730498/r/il/c28548/7083527725/il_fullxfull.7083527725_qklb.jpg"
             alt="Native wear 4"
             
           />
           <div className="card-text">
       <p>₦60000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Kaftan2",45000,"https://wp-media-dejiandkola.s3.eu-west-2.amazonaws.com/2023/11/396720504_18008963477003708_1894037420598593680_n.jpg")}>
           <img
             src="https://wp-media-dejiandkola.s3.eu-west-2.amazonaws.com/2023/11/396720504_18008963477003708_1894037420598593680_n.jpg"
             alt="Native wear 5"
             
           />
           <div className="card-text">
       <p>₦45000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Danshiki",80000,"https://media.istockphoto.com/id/2169937342/photo/cheerful-yoruba-man-dancing-joyfully-at-cultural-celebration-in-traditional-attire.jpg?s=170667a&w=0&k=20&c=fpBfGMy2yBo-eHy5G3dCz4rfvCX3yjAo5VoCcYc4F7Y=")}>
           <img
             src="https://media.istockphoto.com/id/2169937342/photo/cheerful-yoruba-man-dancing-joyfully-at-cultural-celebration-in-traditional-attire.jpg?s=170667a&w=0&k=20&c=fpBfGMy2yBo-eHy5G3dCz4rfvCX3yjAo5VoCcYc4F7Y="
             alt="Native wear 6"
             
           />
               <div className="card-text">
       <p>₦80000</p>
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
    value={user?.user?.Email }
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
          name="price"
          value={`₦${selectedPrice}`}
          readOnly
        />
{selectedPrice > basePrice && (
  <p style={{ color: "red" }}>
    Rush fee of ₦20,000 applied (delivery within 5 days)
  </p>
)}

<input type="hidden" name="basePrice" value={basePrice} /> //1
<input type="hidden" name="selectedCard" value={selectedCard} /> //2

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

export default Native
