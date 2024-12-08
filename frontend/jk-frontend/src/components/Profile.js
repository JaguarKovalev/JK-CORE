import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://127.0.0.1:8000/api/employees/profile/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
                alert('Session expired. Please log in again.');
                navigate('/login');
            });
    }, [navigate]);

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {profile.username}</p>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
            <button onClick={() => navigate('/logout')}>Logout</button>
            <button onClick={() => navigate('/change-password')}>Change Password</button>
            <button onClick={() => navigate('/employees')}>View Employees</button>
        </div>
        
    );
};

export default Profile;
