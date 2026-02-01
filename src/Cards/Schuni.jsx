import React,{useState,useEffect} from 'react'
import './Cards.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Schuni = () => {
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
      setSelectedImage(null);
      setErrorMessage(null);
    };
  
  //  useEffect(() => {
  //     const storedUser = localStorage.getItem("user");
  
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser)); // convert string to object
  //     }
  useEffect(() =>{
    const storedUser=JSON.parse(localStorage.getItem("user"))
    if(storedUser){
      setUser(storedUser)
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
    <div>
    <div className='container'>
      
      <div className='card' onClick={() => handleCardClick("School Wear",33000,"https://i.pinimg.com/736x/f8/85/5e/f8855eca2d50a8f58091a5f2443c0e5b.jpg")}>
        <img
          src="https://pbs.twimg.com/media/EkHIbjgXsAAH1Jl.jpg"
          alt="School wear 1"
          
        />
        <div className="card-text">
    <p>₦33000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear1",37000,"https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/473667876_590866740580917_6482193224498647345_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=Bt18WAaL6T4Q7kNvwH0MwlX&_nc_oc=AdnsFN32WHfSKDP9fRn0-aAW04NouyETRTXx99WrnjM4znjVFfraKA5dvdLOc6tKo3Q&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&_nc_gid=DlTw0_0YD0KkQjWKfvfGfw&oh=00_AfqdeetnO-4pz7z0JlnTd4i1ugOdo3aCsVxroxOv-9HoRA&oe=6972EB8C")}>
        <img 
          src="https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/473667876_590866740580917_6482193224498647345_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=Bt18WAaL6T4Q7kNvwH0MwlX&_nc_oc=AdnsFN32WHfSKDP9fRn0-aAW04NouyETRTXx99WrnjM4znjVFfraKA5dvdLOc6tKo3Q&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&_nc_gid=DlTw0_0YD0KkQjWKfvfGfw&oh=00_AfqdeetnO-4pz7z0JlnTd4i1ugOdo3aCsVxroxOv-9HoRA&oe=6972EB8C"
          alt="Formal wear 2"
          
        />
        <div className="card-text">
    <p>₦37000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear3",35000,"https://cdn-blog.superprof.com/blog_ng/wp-content/uploads/2022/09/school-uniforms-1-1400x935.jpg.webp")}>
        <img
          src="https://cdn-blog.superprof.com/blog_ng/wp-content/uploads/2022/09/school-uniforms-1-1400x935.jpg.webp"
          alt="Formal wear 3"
          
        />
        <div className="card-text">
    <p>₦35000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear4",32000,"https://www.globalsistersreport.org/files/styles/homepage_features_medium/public/stories/images/StPeterSchool_students%20%282%29%20%28883x1000%29.jpg?h=8e635493&itok=S753EuaF")}>
        <img
          src="https://www.globalsistersreport.org/files/styles/homepage_features_medium/public/stories/images/StPeterSchool_students%20%282%29%20%28883x1000%29.jpg?h=8e635493&itok=S753EuaF"
          alt="Formal wear 4"
          
        />
        <div className="card-text">
    <p>₦32000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear5",35000,"https://takooka.com/images/robinwhite/robin_white-2.jpg")}>
        <img
          src="https://takooka.com/images/robinwhite/robin_white-2.jpg"
          alt="School wear 5"
          
        />
        <div className="card-text">
    <p>₦35000</p>
  </div>
      </div>

      <div className='card' onClick={() => handleCardClick("School Wear6",35000,"https://fchcs.org.ng/wp-content/uploads/2023/10/IMG-20220514-WA0032.jpg")}>
        <img
          src="https://fchcs.org.ng/wp-content/uploads/2023/10/IMG-20220514-WA0032.jpg"
          alt="School wear 6"
          
        />
            <div className="card-text">
    <p>₦35000</p>
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
      </div>
  );
};

export default Schuni
