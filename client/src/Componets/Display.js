import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/image/displayimages', {}, {
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <h3>{image.title}</h3>
            <img src={image.link} alt={image.title} className="image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;



