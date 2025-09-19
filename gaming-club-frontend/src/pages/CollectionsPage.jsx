import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import collectionApi from '../api/collection';

const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const CollectionsPage = () => {
    const [date, setDate] = useState(getFormattedDate(new Date()));
    const [collections, setCollections] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCollections = async (searchDate) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await collectionApi.getCollectionsByDate(searchDate);
            setCollections(res.data.records || []);
            setTotal(res.data.total || 0);
        } catch (error) {
            console.error("Failed to fetch collections", error);
            setError('Failed to fetch collections. Please try again.');
            setCollections([]);
            setTotal(0);
        }finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCollections(date);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCollections(date);
    };

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="form-container" style={{maxWidth: '800px'}}>
                    <form onSubmit={handleSearch} className="collections-search">
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="collection-table">
                        <h3>Amount Collection on {date}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {collections.length > 0 ? (
                                    collections.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.memberName}</td>
                                            <td>₹{item.amount}</td>
                                        </tr>
                                ))):(
                                    <tr>
                                        <td colSpan="2">No records found for this date.</td>
                                    </tr>
                                )}
                                <tr className="total-row">
                                    <td>Total</td>
                                    <td>₹{total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CollectionsPage;