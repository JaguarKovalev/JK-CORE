import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/employees/change-password/`,
                { old_password: oldPassword, new_password: newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Password changed successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password.');
        }
    };

    return (
        <div>
            <h1>Change Password</h1>
            <form onSubmit={handleChangePassword}>
                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
