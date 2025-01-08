import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/Logout.css'; // Подключаем стили

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }, [navigate]);

    return (
        <div className="logout-container">
            <h1>Выход из аккаунта</h1>
            <p>Вы успешно вышли. Перенаправление на страницу входа...</p>
        </div>
    );
};

export default Logout;
