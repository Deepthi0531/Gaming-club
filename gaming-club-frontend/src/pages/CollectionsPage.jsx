import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import collectionApi from '../api/collection';

// Helper to format date to YYYY-MM-DD
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

    const fetchCollections = async (searchDate) => {
        try {
            const res = await collectionApi.getCollectionsByDate(searchDate);
            setCollections(res.data.records || []); // Assuming backend returns { records: [...], total: ... }
            setTotal(res.data.total || 0);
        } catch (error) {
            console.error("Failed to fetch collections", error);
            setCollections([]);
            setTotal(0);
        }
    };
    
    useEffect(() => {
        fetchCollections(date);
    }, []); // Fetch on initial render for today's date

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCollections(date);
    };

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="form-container">
                    <form onSubmit={handleSearch} className="collections-search">
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                        <button type="submit">Search</button>
                    </form>
                    <div className="collection-table">
                        <h3>Recharge Collection on {date}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Recharge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {collections.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.memberName}</td>
                                        <td>₹{item.amount}</td>
                                    </tr>
                                ))}
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