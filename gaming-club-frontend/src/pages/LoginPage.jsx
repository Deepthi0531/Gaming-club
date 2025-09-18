import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth';
import Footer from '../components/Footer';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authApi.login(username, password);
            // Assuming the backend returns a user object with a token
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/member-search');
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="page-container">
            <header className="app-header" style={{ justifyContent: 'center' }}>
                 <h1>GAMING CLUB APP</h1>
            </header>
            <main className="main-content">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;