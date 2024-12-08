import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';
import ChangePassword from './components/ChangePassword';
import EmployeeList from './components/EmployeeList';

function App() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                    path="/change-password"
                    element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />}
                />
                <Route path="/logout" element={<Logout />} />

                <Route
                    path="/employees"
                    element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App;
