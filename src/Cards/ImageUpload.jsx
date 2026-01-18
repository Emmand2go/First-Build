import React, { useState } from "react";
import axios from "axios";
import "./Cards.css";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("message", message); // 👈 special message

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("Upload successful!");
      setMessage("");
      setFile(null);
      setPreview(null);
    } catch (err) {
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="upload-container">
      <form className="upload-card" onSubmit={handleSubmit}>
        <h2>Upload Image</h2>

        <label className="file-input">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          Choose Image
        </label>

        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}

        {/* Special Message Input */}
        <textarea
          className="message-input"
          placeholder="Enter a special message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />

        <button type="submit" className="upload-btn">
          Upload
        </button>

        {status && <p className="status-text">{status}</p>}
      </form>
    </div>
  );
};

export default ImageUpload;

// Cloudinary
// import React, { useState } from "react";
// import axios from "axios";
// import "./Cards.css";

// const ImageUpload = () => {
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const openCloudinaryWidget = () => {
//     if (!window.cloudinary) {
//       setStatus("Cloudinary not loaded");
//       return;
//     }

//     setUploading(true);

//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: "YOUR_CLOUD_NAME",
//         uploadPreset: "YOUR_UPLOAD_PRESET",

//         // 🔽 scale down image
//         transformation: [
//           {
//             width: 800,
//             height: 800,
//             crop: "limit",
//             quality: "auto",
//             fetch_format: "auto"
//           }
//         ],

//         multiple: false,
//         resourceType: "image",
//         clientAllowedFormats: ["jpg", "png", "webp"],
//         maxFileSize: 5000000
//       },
//       async (error, result) => {
//         if (error) {
//           setStatus("Upload failed");
//           setUploading(false);
//           return;
//         }

//         if (result.event === "success") {
//           const imageUrl = result.info.secure_url;
//           setPreview(imageUrl);

//           try {
//             await axios.post("http://localhost:5000/upload", {
//               imageUrl,
//               message
//             });

//             setStatus("Upload successful!");
//             setMessage("");
//           } catch (err) {
//             setStatus("Backend save failed.");
//           } finally {
//             setUploading(false);
//           }
//         }
//       }
//     );

//     widget.open();
//   };

//   return (
//     <div className="upload-container">
//       <div className="upload-card">
//         <h2>Upload Image</h2>

//         {/* Message Input */}
//         <textarea
//           className="message-input"
//           placeholder="Enter a special message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           rows={4}
//         />

//         {/* Upload Button */}
//         <button
//           className="upload-btn"
//           onClick={openCloudinaryWidget}
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Choose Image"}
//         </button>

//         {/* Preview */}
//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             className="preview-image"
//           />
//         )}

//         {status && <p className="status-text">{status}</p>}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;



// its backend
// app.post("/upload", (req, res) => {
//   const { imageUrl, message } = req.body;

//   // Save imageUrl + message to DB
//   console.log(imageUrl, message);

//   res.json({ success: true });
// });