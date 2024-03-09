import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Insert() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'images__preset');
      formData.append('cloud_name', 'dntzl5ras');
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dntzl5ras/image/upload',
        formData
      );
      const imageUrl = cloudinaryResponse.data.secure_url;

      // Send image data to backend
      const token = localStorage.getItem('token');
      const headers = {
        'auth-token': token,
        'Content-Type': 'application/json',
      };
      const backendResponse = await axios.post(
        'http://localhost:8000/api/image',
        { link: imageUrl, title: title },
        { headers: headers }
      );
      navigate('/Display')
      //if (backendResponse.data.success) {
        //navigate('/Display'); // Use navigate to redirect
      //} else {
        //alert('Error in posting image');
      //}
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mycard">
          <div className="card res-card">
            <h2>Upload the image</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Upload</button>
          </div>
        </div>
      </form>
    </>
  );
}

