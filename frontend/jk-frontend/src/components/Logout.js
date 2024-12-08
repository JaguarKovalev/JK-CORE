import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        alert('You have been logged out.');
        navigate('/login');
    }, [navigate]);

    return <p>Logging out...</p>;
};

export default Logout;
