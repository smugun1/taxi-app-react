import React, { useState } from 'react';

const AddTransaction = () => {
    // State to manage the transaction form data
    const [newTransactionData, setNewTransactionData] = useState({
        transactionId: '',
        amount: '',
        date: '',
        paymentMethod: '',
        transactionStatus: '',
    });

    // Function to handle form submission
    const handleCreateTransaction = (event) => {
        event.preventDefault();
        console.log('New Transaction Data:', newTransactionData);
        // Add the logic to send this data to the backend or perform necessary actions
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransactionData({
            ...newTransactionData,
            [name]: value,
        });
    };
  return (
    <div>
        <form onSubmit={handleCreateTransaction} className="mb-8 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Transaction</h3>
          <div className="mb-4">
            <label className="block text-gray-700">User</label>
            <input
              type="text"
              value={newTransactionData.user}
              onChange={(e) => setNewTransactionData({ ...newTransactionData, user: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="text"
              value={newTransactionData.amount}
              onChange={(e) => setNewTransactionData({ ...newTransactionData, amount: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              value={newTransactionData.description}
              onChange={(e) => setNewTransactionData({ ...newTransactionData, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Timestamp</label>
            <input
              type="datetime-local"
              value={newTransactionData.timestamp}
              onChange={(e) => setNewTransactionData({ ...newTransactionData, timestamp: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Active</label>
            <input
              type="checkbox"
              checked={newTransactionData.is_active}
              onChange={(e) => setNewTransactionData({ ...newTransactionData, is_active: e.target.checked })}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Transaction
          </button>
        </form>
    </div>
  )
}

export default AddTransaction