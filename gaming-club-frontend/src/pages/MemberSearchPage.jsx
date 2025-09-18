import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import memberApi from '../api/member';

const MemberSearchPage = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Check if member exists
            await memberApi.findMemberByPhone(phone);
            navigate(`/member/${phone}`);
        } catch (err) {
            setError('Member not found with this phone number.');
        }
    };

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="form-container">
                    <h2>MEMBER SEARCH</h2>
                    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" style={{ width: 'auto' }}>Search</button>
                    </form>
                    {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MemberSearchPage;