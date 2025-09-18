import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import memberApi from '../api/member';
import rechargeApi from '../api/recharge';

const RechargePage = () => {
    const { phone } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        memberApi.findMemberByPhone(phone)
            .then(response => {
                setMember(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsError(true);
                setMessage('Could not find member details.');
                setIsLoading(false);
            });
    }, [phone]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);
        try {
            await rechargeApi.rechargeAccount(phone, amount);
            setMessage(`Successfully recharged ₹${amount}. Redirecting to member search...`);
            setIsError(false);
            setTimeout(() => {
                navigate('/member-search');
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Recharge failed.');
            setIsError(true);
        }
    };

    if (isLoading) {
        return <div>Loading member details...</div>;
    }

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="form-container">
                    <h2>RECHARGE ACCOUNT</h2>
                    {member ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" value={member.phone} disabled />
                            </div>
                            <div className="form-group">
                                <label>Member Name</label>
                                <input type="text" value={member.name} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Recharge Amount (₹)</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
                            <button type="submit">Add Recharge</button>
                        </form>
                    ) : (
                        <p style={{ color: 'red' }}>{message}</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RechargePage;