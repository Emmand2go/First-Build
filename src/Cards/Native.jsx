import React, {useState,useEffect} from 'react'
import './Cards.css'

const Native = () => {
    const[showForm, setShowForm] = useState(false);
     const [selectedCard, setSelectedCard] = useState(null);
     const [selectedPrice, setSelectedPrice] = useState("");
     const [user,setUser]=useState('');
      const [minDate, setMinDate] = useState('');
   
     const handleCardClick = (cardTitle,price) => {
       setSelectedCard(cardTitle);
       setSelectedPrice(price);
       setShowForm(true);
     };
   
     const closeForm = () => {
       setShowForm(false);
       setSelectedCard(null);
       setSelectedPrice(null)
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
         
         <div className='card' onClick={() => handleCardClick("Native Wear",30000)}>
           <img
             src="https://i.etsystatic.com/20664734/r/il/71f8d0/5424763726/il_570xN.5424763726_iuq5.jpg"
             alt="Native wear 1"
             
           />
           <div className="card-text">
       <h3>T-shirt</h3>
       <p>₦30000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Native Wear1",45000)}>
           <img
             src="https://i0.wp.com/www.zedighana.com/wp-content/uploads/2023/12/zedi_dirty_december-0083--scaled-e1702932248120.jpg?fit=1557%2C1527&ssl=1"
             alt="Native wear 2"
             
           />
           <div className="card-text">
       <h3> Suit</h3>
       <p>₦45000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Native Wear3",50000)}>
           <img
             src="https://i.pinimg.com/736x/3b/02/b0/3b02b0b7fd62767d58af197f311e881b.jpg"
             alt="Native wear 3"
             
           />
           <div className="card-text">
       <h3> Bandhgala suit</h3>
       <p>₦50000</p>
     </div>
         </div>
   
         <div className='card' onClick={() => handleCardClick("Native Wear4")}>
           <img
             src="https://i.etsystatic.com/60730498/r/il/c28548/7083527725/il_fullxfull.7083527725_qklb.jpg"
             alt="Native wear 4"
             
           />
         </div>
   
         <div className='card' onClick={() => handleCardClick("Native Wear5")}>
           <img
             src="https://wp-media-dejiandkola.s3.eu-west-2.amazonaws.com/2023/11/396720504_18008963477003708_1894037420598593680_n.jpg"
             alt="Native wear 5"
             
           />
         </div>
   
         <div className='card' onClick={() => handleCardClick("Native Wear6")}>
           <img
             src="https://media.istockphoto.com/id/2169937342/photo/cheerful-yoruba-man-dancing-joyfully-at-cultural-celebration-in-traditional-attire.jpg?s=170667a&w=0&k=20&c=fpBfGMy2yBo-eHy5G3dCz4rfvCX3yjAo5VoCcYc4F7Y="
             alt="Native wear 6"
             
           />
               <div className="card-text">
       <h3> Danshiki</h3>
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

export default Native
