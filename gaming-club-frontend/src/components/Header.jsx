import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authApi from '../api/auth';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        authApi.logout();
        navigate('/login');
    };

    return (
        <header className="app-header">
            <h1>GAMING CLUB APP</h1>
            <nav className="nav-links">
                <NavLink to="/membership">Membership</NavLink>
                <NavLink to="/member-search">Member</NavLink>
                <NavLink to="/add-game">Add Game</NavLink>
                <NavLink to="/collections">Collections</NavLink>
            </nav>
            <div className="user-info">
                <span>{user?.username || 'Admin'}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;