import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PictureInsert = () => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const headers = {
        'auth-token': token,
        'Content-Type': 'application/json'
      };
      console.log(formData)
      const response = await fetch('http://localhost:8000/api/image', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error uploading image');
      }

      setMessage('Image uploaded successfully');
    } catch (error) {
      setMessage('Error uploading image');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Upload Image</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PictureInsert;

