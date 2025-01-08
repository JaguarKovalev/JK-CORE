import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/ChangePassword.css'; // Подключаем стили

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            await axios.post(
                `$/api/employees/change-password/`,
                { old_password: oldPassword, new_password: newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Пароль успешно изменён!');
            navigate('/profile');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Не удалось изменить пароль. Проверьте данные.');
        }
    };

    return (
        <div className="change-password-container">
            <h1>Сменить пароль</h1>
            <form onSubmit={handleChangePassword} className="change-password-form">
                <input
                    type="password"
                    placeholder="Старый пароль"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Новый пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Изменить пароль</button>
            </form>
        </div>
    );
};

export default ChangePassword;
