import React from 'react';
import { NavLink } from 'react-router-dom';
// import '../styles/Menu.css';

const Menu = () => {
    return (
        <div className="menu-container">
            <nav className="menu">
                <NavLink
                    to="/"
                    exact="true"
                    className="menu-link"
                    activeclassname="active"
                >
                    Главная
                </NavLink>
                <NavLink
                    to="/profile"
                    className="menu-link"
                    activeclassname="active"
                >
                    Профиль
                </NavLink>
                <NavLink
                    to="/projects"
                    className="menu-link"
                    activeclassname="active"
                >
                    Проекты
                </NavLink>
                <NavLink
                    to="/services"
                    className="menu-link"
                    activeclassname="active"
                >
                    Услуги
                </NavLink>
            </nav>
        </div>
    );
};

export default Menu;
