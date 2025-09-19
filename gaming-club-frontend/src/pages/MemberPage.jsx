import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import memberApi from '../api/member';
import gameApi from '../api/game';

const MemberPage = () => {
    const { phone } = useParams();
    const [member, setMember] = useState(null);
    const [activeTab, setActiveTab] = useState('games');
    const [games, setGames] = useState([]);
    const [rechargeHistory, setRechargeHistory] = useState([]);
    const [playedGames, setPlayedGames] = useState([]);

    const fetchMemberDetails = useCallback(async () => {
        try {
            const res = await memberApi.findMemberByPhone(phone);
            setMember(res.data);
        } catch (error) {
            console.error("Failed to fetch member details", error);
        }
    }, [phone]);

    useEffect(() => {
        fetchMemberDetails();
    }, [fetchMemberDetails]);

    useEffect(() => {
        const fetchDataForTab = async () => {
            try {
                if (activeTab === 'games') {
                    const res = await gameApi.getAllGames();
                    setGames(res.data);
                } else if (activeTab === 'recharge') {
                    const res = await memberApi.getRechargeHistory(phone);
                    setRechargeHistory(res.data);
                } else if (activeTab === 'played') {
                    const res = await memberApi.getPlayedGamesHistory(phone);
                    setPlayedGames(res.data);
                }
            } catch (error) {
                console.error(`Failed to fetch data for tab ${activeTab}`, error);
            }
        };
        fetchDataForTab();
    }, [activeTab, phone]);

    const handlePlayGame = async (gameId) => {
        if (window.confirm("Are you sure you want to play this game? The amount will be deducted.")) {
            try {
                await memberApi.playGame(phone, gameId);
                alert("Game played successfully!");
                // Refresh member details to show updated balance
                fetchMemberDetails();
            } catch (error) {
                alert("Failed to play game. Insufficient balance or server error.");
            }
        }
    };

    if (!member) return <div>Loading...</div>;

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="member-details">
                    <h2>MEMBER DETAILS</h2>
                    <p><strong>Name:</strong> {member.name}</p>
                    <p><strong>Phone:</strong> {member.phone}</p>
                    <p><strong>Balance:</strong> ₹{member.balance}</p>
                </div>
                <div className="member-details">
                    <nav className="tab-nav">
                        <button onClick={() => setActiveTab('games')} className={activeTab === 'games' ? 'active' : ''}>Games</button>
                        <button onClick={() => setActiveTab('recharge')} className={activeTab === 'recharge' ? 'active' : ''}>Recharge History</button>
                        <button onClick={() => setActiveTab('played')} className={activeTab === 'played' ? 'active' : ''}>Played Games</button>
                    </nav>
                    <div>
                        {activeTab === 'games' && (
                            <table>
                                <thead><tr><th>Name</th><th>Price</th><th>Description</th><th>Action</th></tr></thead>
                                <tbody>
                                    {games.map(game => (
                                        <tr key={game.id}>
                                            <td>{game.name}</td>
                                            <td>₹{game.price}</td>
                                            <td>{game.description}</td>
                                            <td><button onClick={() => handlePlayGame(game.id)}>Play Game</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {activeTab === 'recharge' && (
                             <table>
                                <thead><tr><th>Date/Time</th><th>Amount</th></tr></thead>
                                <tbody>
                                    {rechargeHistory.map(r => (
                                        <tr key={r.id}>
                                            <td>{new Date(r.timestamp).toLocaleString()}</td>
                                            <td>₹{r.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {activeTab === 'played' && (
                            <table>
                                <thead><tr><th>Date/Time</th><th>Game</th><th>Amount</th></tr></thead>
                                <tbody>
                                    {playedGames.map(t => {
                                        // Find the game name from the games array using gameId
                                        const game = games.find(g => g.id === t.gameId);
                                        return (
                                            <tr key={t.id}>
                                                <td>{new Date(t.timestamp).toLocaleString()}</td>
                                                <td>{game ? game.name : t.gameId}</td>
                                                <td>₹{t.amount}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MemberPage;