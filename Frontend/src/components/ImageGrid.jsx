import React from 'react';

const ImageGrid = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Creative Playrooms',
      description: 'Safe and stimulating play areas designed for exploration and fun',
      image: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Art & Creativity',
      description: 'Encouraging self-expression through various art activities',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Early Learning',
      description: 'Interactive educational programs for cognitive development',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Outdoor Adventures',
      description: 'Beautiful outdoor spaces for physical activities and nature exploration',
      image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const styles = `
    .gallery-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .section-title {
      font-size: 2.8rem;
      color: #2c3e50;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    
    .section-subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .gallery-item {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      position: relative;
    }
    
    .gallery-item:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    
    .gallery-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .gallery-item:hover .gallery-image {
      transform: scale(1.1);
    }
    
    .gallery-content {
      padding: 2rem;
      position: relative;
      background: white;
    }
    
    .gallery-title {
      font-size: 1.4rem;
      color: #2c3e50;
      margin-bottom: 0.8rem;
      font-weight: 600;
    }
    
    .gallery-description {
      color: #6c757d;
      line-height: 1.5;
      font-size: 0.95rem;
    }
    
    .gallery-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      color: white;
      text-align: center;
      padding: 2rem;
    }
    
    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }
    
    .overlay-content h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    
    .overlay-content p {
      font-size: 1rem;
      opacity: 0.9;
    }
    
    @media (max-width: 768px) {
      .gallery-section {
        padding: 60px 0;
      }
      
      .section-title {
        font-size: 2.2rem;
      }
      
      .gallery-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .gallery-item:hover {
        transform: translateY(-5px);
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <section className="gallery-section">
        <div className="section-header">
          <h2 className="section-title">Our Wonderful Environment</h2>
          <p className="section-subtitle">
            Discover the beautiful spaces where your child will learn, play, and grow every day
          </p>
        </div>
        
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <img 
                src={item.image} 
                alt={item.title}
                className="gallery-image"
              />
              <div className="gallery-content">
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-description">{item.description}</p>
              </div>
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ImageGrid;