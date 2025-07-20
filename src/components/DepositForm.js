import React, { useState } from 'react';

function DepositForm({ goals, makeDeposit }) {
  const [amount, setAmount] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedGoalId || !amount) {
      alert('Please select a goal and enter an amount.');
      return;
    }

    makeDeposit(selectedGoalId, parseFloat(amount));

    // Reset form
    setAmount('');
    setSelectedGoalId('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>

      <select
        value={selectedGoalId}
        onChange={(e) => setSelectedGoalId(e.target.value)}
        required
      >
        <option value="">Select Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
