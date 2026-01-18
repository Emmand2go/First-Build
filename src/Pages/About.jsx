import React from "react";


// import tailorImg from "./assets/tailor.jpg";
// import shopImg from "./assets/shop.jpg";
// import workImg from "./assets/work.jpg";

const About = () => {
const tailorImg =
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9";
  const shopImg =
    "https://images.unsplash.com/photo-1582735689369-4fe89db7114c";
  const workImg =
    "https://images.unsplash.com/photo-1593032457866-e555d65b3f8f";

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <h1>About Me</h1>
        <p>Trusted Tailoring with Skill & Honesty</p>
      </section>

      {/* Personal Section */}
      <section className="about-personal">
        <div className="personal-text">
          <h2>Your Trusted Tailor</h2>
          <p>
            I am a professional tailor dedicated to delivering perfectly fitted
            garments. With years of experience, I focus on quality stitching,
            comfort, and customer satisfaction.
          </p>
        </div>

        <div className="personal-image">
          <img src={tailorImg} alt="Professional Tailor" />
        </div>
      </section>

      {/* Work Images */}
      <section className="about-gallery">
        <h2>My Work & Shop</h2>
        <div className="gallery">
          <img src={shopImg} alt="Tailor Shop" />
          <img src={workImg} alt="Tailoring Work" />
        </div>
      </section>

      {/* Location */}
      <section className="about-location">
        <h2>Visit My Shop</h2>
        <iframe
          title="Tailor Location"
          // src="https://www.google.com/maps?q=YOUR_LOCATION_HERE&output=embed"
          src="https://www.google.com/maps?q=5.4817584,7.0015031&z=16&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* Contact */}
      <section className="about-contact">
        <h2>Contact Me</h2>
        <p>📞 Phone: +1 234 567 890</p>
        <p>📧 Email: tailor@example.com</p>
      </section>
    </div>
  );
};

export default About;