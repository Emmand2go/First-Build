import React, {useState,useEffect} from 'react'



const UploadForm = () => {
    const [selectedCard, setSelectedCard] = useState(null);
const [user,setUser]=useState('');
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
  )
}

export default UploadForm
