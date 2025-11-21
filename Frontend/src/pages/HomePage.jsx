import React, { useEffect, useState, useRef } from 'react';
import {
  FaGraduationCap,
  FaShieldAlt,
  FaAppleAlt,
  FaHeart,
  FaChild,
  FaStar,
  FaRocket,
  FaAward,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaSchool,
  FaPaintBrush,
  FaMusic
} from 'react-icons/fa';

// Images
import bannerImage from '../assets/images/banner.jpg';
import classroomImage from '../assets/images/classroom.jpg';
import playgroundImage from '../assets/images/playground.jpg';
import artClassImage from '../assets/images/art-class.jpg';
import musicRoomImage from '../assets/images/music-room.jpg';

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      text: "Little Stars has been a blessing for our family. The teachers are incredible and our daughter loves going every day!",
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Parent',
      text: "The curriculum is outstanding and the daily updates give us peace of mind. Highly recommended!",
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Parent',
      text: "We've seen amazing growth in our son's social skills and confidence. Thank you Little Stars!",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const stats = [
    { number: '98%', label: 'Parent Satisfaction' },
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Happy Children' },
    { number: '25:1', label: 'Student-Teacher Ratio' },
  ];

  const features = [
    {
      icon: <FaGraduationCap />,
      title: 'Qualified Educators',
      description: 'Certified early childhood educators with years of experience and passion for teaching.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Safe Environment',
      description: 'State-of-the-art security systems and certified safety protocols for complete peace of mind.'
    },
    {
      icon: <FaAppleAlt />,
      title: 'Healthy Nutrition',
      description: 'Nutritious, balanced meals prepared daily using fresh, locally-sourced ingredients.'
    },
    {
      icon: <FaChild />,
      title: 'Creative Learning',
      description: 'STEAM-based curriculum that encourages creativity, curiosity, and critical thinking.'
    },
    {
      icon: <FaHeart />,
      title: 'Loving Care',
      description: 'Warm, nurturing environment where every child feels valued, heard, and supported.'
    },
    {
      icon: <FaStar />,
      title: 'Premium Facilities',
      description: 'Modern learning spaces designed to inspire wonder and facilitate optimal development.'
    },
  ];

  const programs = [
    {
      icon: <FaChild />,
      title: 'Infant Care',
      age: '0-2 years',
      description: 'Gentle, individualized care with focus on early development milestones'
    },
    {
      icon: <FaUsers />,
      title: 'Toddler Program',
      age: '2-3 years',
      description: 'Social skills development through guided play and exploration'
    },
    {
      icon: <FaSchool />,
      title: 'Preschool',
      age: '3-5 years',
      description: 'School readiness with literacy, numeracy, and social-emotional learning'
    },
    {
      icon: <FaPaintBrush />,
      title: 'Art & Creativity',
      age: 'All ages',
      description: 'Creative expression through various art forms and materials'
    },
    {
      icon: <FaMusic />,
      title: 'Music & Movement',
      age: 'All ages',
      description: 'Rhythm, coordination, and musical appreciation activities'
    },
    {
      icon: <FaRocket />,
      title: 'Enrichment',
      age: '4-6 years',
      description: 'Advanced learning opportunities for curious young minds'
    },
  ];

  const styles = `
    .home-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, 
        rgba(102, 126, 234, 0.9) 0%, 
        rgba(118, 75, 162, 0.9) 100%),
        url(${bannerImage});
      background-size: cover;
      background-position: center;
      color: white;
      padding: 120px 20px;
      text-align: center;
      position: relative;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
    }

    .hero-badge {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 8px 20px;
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 2rem;
      display: inline-block;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .hero-title {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
      line-height: 1.1;
      text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
    }

    .hero-subtitle {
      font-size: 1.4rem;
      margin-bottom: 3rem;
      opacity: 0.95;
      font-weight: 300;
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 3rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
      color: white;
      padding: 16px 40px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: none;
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-secondary {
      background: transparent;
      color: white;
      padding: 16px 40px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    /* Stats Section */
    .stats-section {
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: white;
      padding: 80px 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      text-align: center;
    }

    .stat-item {
      padding: 2rem;
    }

    .stat-number {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #FF6B6B 0%, #4A6CE9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      font-size: 1.2rem;
      opacity: 0.9;
      font-weight: 500;
    }

    /* Features Section */
    .features-section {
      padding: 100px 0;
      background: white;
    }

    .section-header {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 5rem;
    }

    .section-pre-title {
      color: #4A6CE9;
      font-weight: 600;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 1rem;
      display: block;
    }

    .section-title {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      color: #1a1a1a;
      font-weight: 700;
      line-height: 1.2;
    }

    .section-subtitle {
      font-size: 1.3rem;
      color: #666;
      line-height: 1.7;
      font-weight: 400;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .feature-card {
      background: #f8f9fa;
      padding: 3rem 2.5rem;
      border-radius: 20px;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 1px solid #e8edff;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      position: relative;
      overflow: hidden;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #4A6CE9 0%, #6A43B7 100%);
    }

    .feature-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 25px 60px rgba(0,0,0,0.15);
    }

    .feature-icon-wrapper {
      width: 90px;
      height: 90px;
      background: linear-gradient(135deg, #4A6CE9 0%, #6A43B7 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
    }

    .feature-icon {
      font-size: 2.2rem;
      color: white;
    }

    .feature-title {
      font-size: 1.6rem;
      margin-bottom: 1.2rem;
      color: #1a1a1a;
      font-weight: 600;
    }

    .feature-description {
      color: #666;
      line-height: 1.7;
      font-size: 1.05rem;
    }

    /* Programs Section */
    .programs-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
    }

    .programs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .program-card {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 20px;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid #e8edff;
      box-shadow: 0 8px 30px rgba(0,0,0,0.06);
    }

    .program-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.1);
    }

    .program-icon {
      font-size: 3rem;
      color: #4A6CE9;
      margin-bottom: 1.5rem;
    }

    .program-title {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      color: #1a1a1a;
      font-weight: 600;
    }

    .program-age {
      color: #4A6CE9;
      font-weight: 600;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .program-description {
      color: #666;
      line-height: 1.6;
    }

    /* Gallery Section */
    .gallery-section {
      padding: 100px 0;
      background: white;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 300px);
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .gallery-item {
      position: relative;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
    }

    .gallery-item:nth-child(1) {
      grid-column: span 2;
    }

    .gallery-item:nth-child(4) {
      grid-column: span 2;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .gallery-item:hover img {
      transform: scale(1.1);
    }

    .gallery-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      color: white;
      padding: 2rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .gallery-item:hover .gallery-overlay {
      transform: translateY(0);
    }

    /* Testimonials Section */
    .testimonials-section {
      padding: 100px 0;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      color: white;
    }

    .testimonials-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
    }

    .testimonial-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .testimonial-text {
      font-size: 1.3rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      font-style: italic;
    }

    .testimonial-author {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .testimonial-role {
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.5rem;
    }

    .testimonial-stars {
      color: #FFD700;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #4A6CE9 0%, #6A43B7 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .cta-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .cta-title {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }

    .cta-description {
      font-size: 1.3rem;
      margin-bottom: 3rem;
      opacity: 0.95;
      line-height: 1.6;
    }

    .cta-button {
      background: white;
      color: #4A6CE9;
      padding: 18px 50px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.2rem;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: inline-block;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    .cta-button:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }

    /* Footer */
    .footer {
      background: #1a1a1a;
      color: white;
      padding: 60px 0 30px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 3rem;
    }

    .footer-section h3 {
      margin-bottom: 1.5rem;
      color: white;
    }

    .footer-section p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
    }

    .footer-section a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-section a:hover {
      color: white;
    }

    .footer-bottom {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.2rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .section-title {
        font-size: 2.2rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .gallery-grid {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 300px);
      }
      
      .gallery-item:nth-child(1),
      .gallery-item:nth-child(4) {
        grid-column: span 1;
      }
      
      .cta-title {
        font-size: 2.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-badge">🏆 Award-Winning Childcare Center</span>
            <h1 className="hero-title">
              Where Little Dreams<br />
              <span style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Become Big Adventures
              </span>
            </h1>
            <p className="hero-subtitle">
              Experience premium early childhood education in a nurturing environment designed 
              to inspire creativity, build confidence, and foster lifelong learning.
            </p>
            <div className="hero-buttons">
              <a href="/enroll" className="btn-primary">
                <FaAward /> Enroll Today
              </a>
              <a href="/tour" className="btn-secondary">
                <FaRocket /> Schedule Tour
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <span className="section-pre-title">Why Parents Trust Us</span>
            <h2 className="section-title">Excellence in Early Childhood Development</h2>
            <p className="section-subtitle">
              Our holistic approach combines cutting-edge educational methods with compassionate care 
              to create the perfect foundation for your child's future success.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Programs Section */}
        <section className="programs-section">
          <div className="section-header">
            <span className="section-pre-title">Our Programs</span>
            <h2 className="section-title">Age-Appropriate Learning Paths</h2>
            <p className="section-subtitle">
              Carefully designed programs that grow with your child, from infancy through preschool readiness.
            </p>
          </div>
          <div className="programs-grid">
            {programs.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-icon">{program.icon}</div>
                <h3 className="program-title">{program.title}</h3>
                <div className="program-age">{program.age}</div>
                <p className="program-description">{program.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery-section">
          <div className="section-header">
            <span className="section-pre-title">Our World</span>
            <h2 className="section-title">A Glimpse Into Little Stars</h2>
            <p className="section-subtitle">
              Discover our vibrant learning environments and see why children love coming to our center every day.
            </p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src={classroomImage} alt="Modern classroom with children" />
              <div className="gallery-overlay">
                <h3>Innovative Learning Spaces</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src={playgroundImage} alt="Children playing outdoors" />
              <div className="gallery-overlay">
                <h3>Outdoor Adventure Playground</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src={artClassImage} alt="Art and craft activities" />
              <div className="gallery-overlay">
                <h3>Creative Arts Studio</h3>
              </div>
            </div>
            <div className="gallery-item">
              <img src={musicRoomImage} alt="Music and movement class" />
              <div className="gallery-overlay">
                <h3>Music & Movement Room</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="section-header">
            <span className="section-pre-title">Happy Parents</span>
            <h2 className="section-title">What Families Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it - hear from our community of happy families.
            </p>
          </div>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {'★'.repeat(testimonials[activeTestimonial].rating)}
              </div>
              <p className="testimonial-text">"{testimonials[activeTestimonial].text}"</p>
              <div className="testimonial-author">{testimonials[activeTestimonial].name}</div>
              <div className="testimonial-role">{testimonials[activeTestimonial].role}</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Begin the Journey?</h2>
            <p className="cta-description">
              Join our community of exceptional families and give your child the gift of 
              a world-class early education experience. Limited enrollment available.
            </p>
            <a href="/enroll" className="cta-button">
              <FaAward /> Secure Your Spot Today
            </a>
          </div>
        </section>

  
      </div>
    </>
  );
};

export default HomePage;