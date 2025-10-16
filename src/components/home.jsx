import React, { useState } from 'react';
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import ResponsiveNav from "./mysecondnav";
import { useSelector } from "react-redux";
import EnquiryPop from './enquirypop';
const HomePage = () => {
  const navigateto = useNavigate();
  const { currentuser } = useSelector((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="homepage">
      {currentuser && <ResponsiveNav />}
      {/* Hero Section */}
      <EnquiryPop show={showPopup} onClose={() => setShowPopup(false)} />
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">From China to the World, and the World to China</h1>
            <p className="hero-subtitle">
          Reliable import, export, and product sourcing — plus academic support including thesis guidance, scientific writing, and scholarship application assistance in China.
            </p>
            <button
              onClick={() => {
                navigateto("/allproduct");
              }}
              className="btn btn-primary explore-btn"
            >
              Explore Our Products
            </button>
          </div>
          <div className="hero-media">
            {/* Video Section */}
            {/* <div className="media-frame" >
              <video autoPlay loop muted playsInline className="animated-video">
                <source src="tool.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div> */}
            {/* Product Showcase */}
            <div className="product-showcase">
              <div className="product-gallery">
                {/* Two Products in a Column */}
                <div className="product-column">
                  <div className="product-card">
                    <div style={{display:'flex',gap:'5px'}}>
                    <img src="/xiao.jpeg"   onClick={() => {
                navigateto("/allproduct?itemss=gadgets");
              }} alt="Mini Tiller" />
                    <div className="product-info">
                    
                     
                    </div>
                    <img  src="/solar.jpeg"  onClick={() => {
                navigateto("/allproduct?itemss=Energy");
              }} alt="Smart Seeder" />
                    <div className="product-info">
                  
                     
                    </div></div>
                    <img src="/elctricalcar.jpg"  onClick={() => {
                navigateto("/allproduct?itemss=cars");
              }} alt="Multi-Function Tool" />
                    <div className="product-info">
                    
                      <button className="btn btn-primary" onClick={() => {
                navigateto("/allproduct");
              }}>View more</button>
                    </div>
                  </div>
                 
                </div>
                {/* Single Product */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="ceo-section">
  <div class="ceo-container">
    
   
    <div class="ceo-text">
      <h2>Meet Our CEO</h2>
      <h3>Dr. Grace Mulindwa Bahizire</h3>
      <p>
        Dr. Grace Mulindwa Bahizire is a distinguished leader with an outstanding
        academic and professional background. He earned his <strong>Bachelor’s degree
        in Computer Science</strong> in India, followed by an <strong>MBA in England</strong>.
        In 2022, he completed his <strong>PhD in Engineering Logistics at Jiangsu University,
        China</strong>, where he also worked for two years as a <strong>Post-Doctoral Researcher</strong>.
      </p>
      <p>
        Currently based in China, Dr. Bahizire continues his academic journey as a
        <strong>Post-Doctoral Fellow at Huane University</strong>. His research focuses on
        business, mining, and logistics, with many published articles making impactful
        contributions in these fields.
      </p>
      <p>
        📑 Explore his publications on 
        <a href="https://www.researchgate.net/profile/Grace-Bahizire" target="_blank">
          ResearchGate
        </a>.
      </p>
    </div>

    <div class="ceo-image">
      <img src="/ceo.jpg" alt="CEO Grace Mulindwa Bahizire" />
    </div>
    
  </div>
</section>
      {/* About Us Section */}
     {/* About Us */}
<section className="ze-about">
  <div className="ze-container ze-about-content">
    <div className="ze-about-text">
      <h2>About Us</h2>
      <p>
      Zhejiang Endiang Import & Export Co. is a China-recognized enterprise facilitating global trade, technology, and education. Through our platform, customers can conveniently purchase high-quality products from China for international delivery. Beyond import/export, we empower academic growth by guiding students worldwide in applying for higher studies in China. With expertise in research, software solutions, and a strong international network, we aim to bridge opportunities across industries, education, and global commerce.
      </p>
    </div>
  </div>
</section>

{/* Our Services */}
<section className="ze-services-section">
  <div className="ze-container">
    <h2>Our Services</h2>
    <div className="ze-services">
      <div className="ze-service-box" onClick={() => setShowPopup(true)}>
        <h3>Import & Export</h3>
        <p>We simplify trade between China and the world with reliable supply chain solutions.</p>
      </div>
      <div className="ze-service-box" onClick={() => setShowPopup(true)}>
        <h3>Research Guidance</h3>
        <p>Expert support for thesis writing and scientific paper publication in any field.</p>
      </div>
      <div className="ze-service-box" onClick={() => setShowPopup(true)}>
        <h3>Web & Software Development</h3>
        <p>High-tech solutions leveraging MERN, Firebase, and advanced security standards, with integrated AI services including face recognition and natural language processing (NLP).</p>
      </div>
      <div className="ze-service-box ze-study-box" onClick={() => setShowPopup(true)}>
        <h3>Study in China</h3>
        <p>We help students apply for universities in China, from admission to visa guidance.</p>
      </div>
    </div>
  </div>
</section>


     
    </div>
  );
};

export default HomePage;
