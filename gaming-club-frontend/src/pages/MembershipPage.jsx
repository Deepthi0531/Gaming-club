import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import membershipApi from '../api/membership';

const MembershipPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [membershipFee, setMembershipFee] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); // Optional: for styling errors vs success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            // The frontend sends an object with `initialDeposit`
            const memberData = { name, phone, initialDeposit: membershipFee };
            await membershipApi.createMembership(memberData);
            
            setMessage(`Membership created successfully for ${name}!`);
            setIsError(false);
            // Clear form
            setName('');
            setPhone('');
            setMembershipFee('');
        } catch (error) {
            // --- FIXED: Display the specific error message from the backend ---
            setMessage(error.response?.data?.message || 'Failed to create membership. Please try again.');
            setIsError(true);
        }
    };

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="form-container">
                    <h2>CREATE MEMBERSHIP</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fee">Membership Fee (₹)</label>
                            <input type="number" id="fee" value={membershipFee} onChange={e => setMembershipFee(e.target.value)} required />
                        </div>
                        
                        {/* Display message with conditional styling */}
                        {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
                        
                        <button type="submit">Create Membership</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MembershipPage;