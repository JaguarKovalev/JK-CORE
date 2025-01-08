import React from 'react';
import { Navigate, NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChangePassword from './components/ChangePassword';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Logout from './components/Logout';
import PortfolioDetail from './components/PortfolioDetail';
import PortfolioList from './components/PortfolioList';
import Profile from './components/Profile';
import ProjectAdminPanel from './components/ProjectAdminPanel';
import ProjectDetail from './components/ProjectDetail';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import ServiceDetail from './components/ServiceDetail';
import ServiceList from './components/ServiceList';
import StatisticsPage from './components/Statistics';
// import './styles/Menu.css';


function App() {
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        
        <Router>
            <div className="menu-container">
                <nav className="menu">
                    <NavLink to="/" exact className="menu-link" activeClassName="active">
                        Главная
                    </NavLink>
                    <NavLink to="https://jaguark.com" className="menu-link" activeClassName="active">
                        Сайт
                    </NavLink>
                    <NavLink to="/profile" className="menu-link" activeClassName="active">
                        Профиль
                    </NavLink>
                    <NavLink to="/projects" className="menu-link" activeClassName="active">
                        Проекты
                    </NavLink>
                    <NavLink to="/services" className="menu-link" activeClassName="active">
                        Услуги
                    </NavLink>
                    <NavLink to="/portfolio" className="menu-link" activeClassName="active">
                        Портфолио
                    </NavLink>
                    <NavLink to="/employees" className="menu-link" activeClassName="active">
                        Сотрудники
                    </NavLink>
                    <NavLink to="/logout" className="menu-link" activeClassName="active">
                        Выход
                    </NavLink>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/projects/admin" element={<ProjectAdminPanel />} />
                <Route path="/projects/create" element={<ProjectForm />} />
                <Route path="/projects/:id/edit" element={<ProjectForm />} />
                <Route
                    path="/projects"
                    element={isAuthenticated ? <ProjectList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/projects/:id"
                    element={isAuthenticated ? <ProjectDetail /> : <Navigate to="/login" />}
                />
                <Route path="/portfolio" element={<PortfolioList />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
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
                <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
