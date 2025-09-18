import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import membershipApi from '../api/membership';

const MembershipPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [membershipFee, setMembershipFee] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await membershipApi.createMembership({ name, phone, initialDeposit: membershipFee });
            setMessage(`Membership created successfully for ${name}!`);
            // Clear form
            setName('');
            setPhone('');
            setMembershipFee('');
        } catch (error) {
            setMessage('Failed to create membership. Please try again.');
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
                            <label htmlFor="fee">Membership Fee</label>
                            <input type="number" id="fee" value={membershipFee} onChange={e => setMembershipFee(e.target.value)} required />
                        </div>
                        {message && <p>{message}</p>}
                        <button type="submit">Create Membership</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MembershipPage;