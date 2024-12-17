import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChangePassword from './components/ChangePassword';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import ProjectList from './components/ProjectList';
import ServiceDetail from './components/ServiceDetail';
import ServiceList from './components/ServiceList';

function App() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route
                    path="/projects"
                    element={isAuthenticated ? <ProjectList /> : <Navigate to="/login" />}
                />
                <Route path="/services" element={<ServiceList />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
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
