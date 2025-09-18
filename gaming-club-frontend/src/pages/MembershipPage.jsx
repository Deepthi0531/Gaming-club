import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import membershipApi from '../api/membership';

const MembershipPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [membershipFee, setMembershipFee] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            const memberData = { name, phone, initialDeposit: membershipFee };
            await membershipApi.createMembership(memberData);
            
            setMessage(`Membership created successfully for ${name}!`);
            setIsError(false);
            setName('');
            setPhone('');
            setMembershipFee('');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                if (window.confirm('A member with this phone number already exists. Would you like to recharge this account?')) {
                    navigate(`/recharge/${phone}`);
                } else {
                    setMessage(error.response.data.message);
                    setIsError(true);
                }
            } else {
                setMessage(error.response?.data?.message || 'Failed to create membership. Please try again.');
                setIsError(true);
            }
        }
    };

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="form-container">
                    <h2>CREATE MEMBERSHIP</h2>
                    <form onSubmit={handleSubmit}>
                        {/* ... form groups for name, phone, fee ... */}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fee">Membership Fee (₹)</label>
                            <input type="number" id="fee" name="fee" value={membershipFee} onChange={e => setMembershipFee(e.target.value)} required />
                        </div>
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