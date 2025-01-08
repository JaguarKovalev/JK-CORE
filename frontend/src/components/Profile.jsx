import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/Profile.css'; // Подключаем стили

const Profile = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`/api/employees/profile/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => setProfile(response.data))
            .catch((error) => {
                console.error('Error fetching profile:', error);
                alert('Session expired. Please log in again.');
                navigate('/login');
            });
    }, [navigate]);

    return (
        <div className="profile-container">
            <h1>Профиль пользователя</h1>
            <div className="profile-info">
                <p><strong>Имя пользователя:</strong> {profile.username}</p>
                <p><strong>Имя:</strong> {profile.first_name}</p>
                <p><strong>Фамилия:</strong> {profile.last_name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Роль:</strong> {profile.role}</p>
            </div>
            <div className="profile-actions">
                <button onClick={() => navigate('/logout')}>Выйти</button>
                <button onClick={() => navigate('/change-password')}>Изменить пароль</button>
                <button onClick={() => navigate('/employees')}>Список сотрудников</button>
                <button onClick={() => navigate('/projects/admin')}>Управление проектами</button>
            </div>
        </div>
    );
};

export default Profile;
