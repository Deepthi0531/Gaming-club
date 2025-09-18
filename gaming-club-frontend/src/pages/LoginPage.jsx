import React, { useState } from 'react';
import authApi from '../api/auth';
import Footer from '../components/Footer';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authApi.login(username, password);
            localStorage.setItem('user', JSON.stringify(response.data));
            window.location.href = '/collections';
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
                                name="username" // Added name attribute
                                autoComplete="username" // Added autocomplete attribute
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
                                name="password" // Added name attribute
                                autoComplete="current-password" // Added autocomplete attribute
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