import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const handleJoinUs = () => {
    navigate('/login');
  };

  const styles = `
    .banner {
      background: linear-gradient(135deg, 
        rgba(102, 126, 234, 0.95) 0%, 
        rgba(118, 75, 162, 0.95) 50%,
        rgba(92, 107, 192, 0.95) 100%),
        url('https://images.unsplash.com/photo-1516627145497-ae69578cfc06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover;
      color: white;
      padding: 120px 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .banner::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.3;
    }
    
    .banner-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 2;
    }
    
    .banner h1 {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      font-weight: 800;
      line-height: 1.2;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .banner p {
      font-size: 1.4rem;
      margin-bottom: 2.5rem;
      opacity: 0.95;
      line-height: 1.6;
      font-weight: 300;
    }
    
    .banner-btn {
      background: linear-gradient(45deg, #FFD700, #FFA500);
      color: #2c3e50;
      padding: 18px 45px;
      border: none;
      border-radius: 50px;
      font-size: 1.3rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .banner-btn:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 35px rgba(0,0,0,0.3);
    }
    
    @media (max-width: 768px) {
      .banner {
        padding: 80px 0;
      }
      
      .banner h1 {
        font-size: 2.5rem;
      }
      
      .banner p {
        font-size: 1.2rem;
      }
      
      .banner-btn {
        padding: 15px 35px;
        font-size: 1.1rem;
      }
    }
    
    @media (max-width: 480px) {
      .banner h1 {
        font-size: 2rem;
      }
      
      .banner p {
        font-size: 1.1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <section className="banner">
        <div className="banner-content">
          <h1>Welcome to Little Stars Nursery</h1>
          <p>Where every child shines bright in our safe, nurturing, and stimulating learning environment</p>
          <button onClick={handleJoinUs} className="banner-btn">
            Join Us Today
          </button>
        </div>
      </section>
    </>
  );
};

export default Banner;