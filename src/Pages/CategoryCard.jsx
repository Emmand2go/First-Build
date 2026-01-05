import React, { useEffect, useState } from "react";
import "./CategoryCard.css";

const CategoryCard = ({ title, images, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="category-card" onClick={onClick}>
      <div className="image-slider">
        <img src={images[currentIndex]} alt={title} />
      </div>
      <div className="card-overlay">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;