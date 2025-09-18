import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import MemberSearchPage from './pages/MemberSearchPage';
import MemberPage from './pages/MemberPage';
import AddGamePage from './pages/AddGamePage';
import CollectionsPage from './pages/CollectionsPage';

const AppRoutes = () => {
    // A simple check for a logged-in user.
    const isAuth = !!localStorage.getItem('user');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/membership" element={isAuth ? <MembershipPage /> : <Navigate to="/login" />} />
                <Route path="/member-search" element={isAuth ? <MemberSearchPage /> : <Navigate to="/login" />} />
                <Route path="/member/:phone" element={isAuth ? <MemberPage /> : <Navigate to="/login" />} />
                <Route path="/add-game" element={isAuth ? <AddGamePage /> : <Navigate to="/login" />} />
                <Route path="/collections" element={isAuth ? <CollectionsPage /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isAuth ? "/member-search" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;