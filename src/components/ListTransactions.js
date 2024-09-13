import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/transactions/', { withCredentials: true });
                setTransactions(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        ${transaction.amount} - {transaction.description} on {transaction.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListTransactions;
