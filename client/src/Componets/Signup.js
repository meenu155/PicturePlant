import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/createuser', formData);
            console.log(response.data);
            const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            //localStorage.setItem('token', json.authtoken);
            navigate('/Login'); // Use navigate to redirect
        } else {
            alert('Invalid credentials');
        }
            // Optionally, you can redirect the user to another page or perform other actions upon successful signup.
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error:', error.response.data);
            } else {
                console.error('Error:', error.message); // Fallback to error message if response or data is undefined
            }
        }
        
    };

    return (
        <div className='mycard'>
            <div className="card res-card">
                <h2>PicturePlant</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name'/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email'/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password'/>
                    <button className="btn waves-effect waves-light #64b5f6 yellow darken-1" type="submit">Sign Up</button>
                </form>
            </div>
            
        </div>
    );
};

export default Signup;
