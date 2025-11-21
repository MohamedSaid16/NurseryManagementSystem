import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const styles = `
    .footer {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      color: white;
      padding: 3rem 0 1rem;
      margin-top: auto;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .footer-section h3 {
      font-size: 1.3rem;
      margin-bottom: 1.5rem;
      color: #ecf0f1;
      font-weight: 600;
    }
    
    .footer-section p {
      color: #bdc3c7;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .footer-links {
      list-style: none;
    }
    
    .footer-links li {
      margin-bottom: 0.8rem;
    }
    
    .footer-links a {
      color: #bdc3c7;
      text-decoration: none;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .footer-links a:hover {
      color: #3498db;
    }
    
    .contact-info {
      list-style: none;
    }
    
    .contact-info li {
      margin-bottom: 1rem;
      color: #bdc3c7;
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    
    .contact-icon {
      width: 20px;
      text-align: center;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .social-link {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background: #3498db;
      transform: translateY(-2px);
    }
    
    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 20px 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      text-align: center;
      color: #95a5a6;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .social-links {
        justify-content: center;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Little Stars Nursery</h3>
            <p>
              Providing exceptional early childhood education and care in a safe, 
              nurturing environment where every child can shine and reach their full potential.
            </p>
            <div className="social-links">
  <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
  <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
  <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
  <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
</div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/programs">Our Programs</a></li>
              <li><a href="/admissions">Admissions</a></li>
              <li><a href="/gallery">Photo Gallery</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li>
                <span className="contact-icon">📍</span>
              University Ibn Khaldoun-Tiaret
              </li>
              <li>
                <span className="contact-icon">📞</span>
                0551818688
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                fantasticguys@gmail.com
              </li>
              <li>
                <span className="contact-icon">🕒</span>
                Mon - Fri: 7:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/safety">Safety Procedures</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Little Stars Nursery. All rights reserved. | Providing excellence in early childhood education since 2010</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;