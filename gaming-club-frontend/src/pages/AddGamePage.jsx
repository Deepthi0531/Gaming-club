import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import gameApi from '../api/game';

const AddGamePage = () => {
    const [gameName, setGameName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [minPlayers, setMinPlayers] = useState(1);
    const [multipleAllowed, setMultipleAllowed] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const gameData = { name: gameName, price, description, minPlayers, multipleAllowed };
        try {
            await gameApi.addGame(gameData);
            setMessage(`Game "${gameName}" added successfully!`);
            // Reset form
            setGameName(''); setPrice(''); setDescription(''); setMinPlayers(1); setMultipleAllowed(false);
        } catch (error) {
            setMessage('Failed to add game. Please try again.');
        }
    };

    return (
        <div className="page-container">
            <Header />
            <main className="main-content">
                <div className="form-container">
                    <h2>ADD GAME</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="gameName">Game Name</label>
                            <input type="text" id="gameName" value={gameName} onChange={e => setGameName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price (₹)</label>
                            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} required />
                        </div>
                         <div className="form-group">
                            <label htmlFor="minPlayers">Min Players</label>
                            <input type="number" id="minPlayers" value={minPlayers} onChange={e => setMinPlayers(e.target.value)} required />
                        </div>
                        <div className="form-group checkbox-group">
                            <label htmlFor="multipleAllowed">Multiple Allowed</label>
                            <input type="checkbox" id="multipleAllowed" checked={multipleAllowed} onChange={e => setMultipleAllowed(e.target.checked)} />
                        </div>
                        {message && <p>{message}</p>}
                        <button type="submit">Add Game</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AddGamePage;