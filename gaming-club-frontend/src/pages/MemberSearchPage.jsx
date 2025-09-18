import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import memberApi from '../api/member';

const MemberSearchPage = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 1. Added loading state
    const navigate = useNavigate();

    const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
        await memberApi.findMemberByPhone(phone);
        navigate(`/member/${phone}`);
    } catch (err) {
        // --- FIXED: Display a more accurate error ---
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(`Error: The server responded with status ${err.response.status}.`);
        } else {
            // Something happened in setting up the request that triggered an Error
            setError('An unexpected error occurred. Please try again.');
        }
    } finally {
        setIsLoading(false);
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
                                disabled={isLoading} // 5. Disable input while loading
                            />
                        </div>
                        <button type="submit" style={{ width: 'auto' }} disabled={isLoading}>
                            {/* 6. Change button text while loading */}
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                    {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MemberSearchPage;