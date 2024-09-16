import React, { useState } from 'react';
import axios from 'axios';

const CreateTransaction = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8000/api/transactions/', { amount, description }, { withCredentials: true });
            alert('Transaction created');
            setAmount('');
            setDescription('');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
            </div>
            <button type="submit">Create Transaction</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateTransaction;
