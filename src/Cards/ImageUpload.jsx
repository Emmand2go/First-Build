import React, { useState } from "react";
import axios from "axios";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const openCloudinaryWidget = () => {
    if (!window.cloudinary) {
      setStatus("Cloudinary not loaded");
      return;
    }

    setUploading(true);

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET,
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto", fetch_format: "auto" }
        ],
        multiple: false,
        resourceType: "image",
        clientAllowedFormats: ["jpg", "png", "webp"],
        maxFileSize: 5000000,
      },
      (error, result) => {
        setUploading(false);
        if (error) {
          setStatus("Upload failed");
          return;
        }
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
          setPreview(result.info.secure_url);
          setStatus("Image uploaded. Ready to save.");
        }
      }
    );

    widget.open();
  };

  // Save image and message → backend returns orderId
  const handleSave = async () => {
    if (!imageUrl) return setStatus("Please upload an image first.");
    if (!message.trim()) return setStatus("Please input message.");

    setSaving(true);
    setStatus("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/order/custom-image`, {
        imageUrl,
        message,
      });

      if (res.data.success) {
        setStatus("Saved successfully!");
        setMessage("");
        setPreview(null);
        setImageUrl(null);

        // ✅ Navigate to details page with real orderId
        navigate(`/details-form/${res.data.customImageId}`);
      } else {
        setStatus("Save failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Backend save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleMainAction = () => {
    if (!imageUrl) openCloudinaryWidget();
    else handleSave();
  };

  const buttonText = uploading
    ? "Uploading..."
    : saving
    ? "Saving..."
    : imageUrl
    ? "Save"
    : "Choose Image";

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Image</h2>

        <textarea
          className="message-input"
          placeholder="Enter a special message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />

        <button
          className="upload-btn"
          onClick={handleMainAction}
          disabled={uploading || saving}
        >
          {buttonText}
        </button>

        {preview && <img src={preview} alt="Preview" className="preview-image" />}
        {status && <p className="status-text">{status}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;