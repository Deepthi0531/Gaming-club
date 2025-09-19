import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MembershipPage from './pages/MembershipPage';
import MemberSearchPage from './pages/MemberSearchPage';
import MemberPage from './pages/MemberPage';
import AddGamePage from './pages/AddGamePage';
import CollectionsPage from './pages/CollectionsPage';
import RechargePage from './pages/RechargePage';

const AppRoutes = () => {
    const isAuth = !!localStorage.getItem('user');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage /> } />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/membership" element={isAuth ? <MembershipPage /> : <Navigate to="/login" />} />
                <Route path="/member-search" element={isAuth ? <MemberSearchPage /> : <Navigate to="/login" />} />
                <Route path="/member/:phone" element={isAuth ? <MemberPage /> : <Navigate to="/login" />} />
                <Route path="/add-game" element={isAuth ? <AddGamePage /> : <Navigate to="/login" />} />
                <Route path="/collections" element={isAuth ? <CollectionsPage /> : <Navigate to="/login" />} />
                <Route path="/recharge/:phone" element={isAuth ? <RechargePage /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isAuth ? "/member-search" : "/signup"} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;