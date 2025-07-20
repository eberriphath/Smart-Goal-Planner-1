
import React, { useState, useEffect } from 'react';
import './App.css'; // import CSS here
import GoalList from './components/GoalList';
import AddGoalForm from './components/AddGoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(err => console.log(err));
  }, []);

  const addGoal = (newGoal) => {
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(data => setGoals([...goals, data]))
      .catch(err => console.log(err));
  };

  const makeDeposit = (goalId, amount) => {
    const goalToUpdate = goals.find(goal => goal.id === goalId);

    const updatedGoal = {
      ...goalToUpdate,
      savedAmount: parseFloat(goalToUpdate.savedAmount) + amount
    };

    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    })
      .then(res => res.json())
      .then(data => {
        const updatedGoals = goals.map(goal =>
          goal.id === goalId ? data : goal
        );
        setGoals(updatedGoals);
      })
      .catch(err => console.log(err));
  };

  const deleteGoal = (goalId) => {
    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedGoals = goals.filter(goal => goal.id !== goalId);
        setGoals(updatedGoals);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm addGoal={addGoal} />
      <DepositForm goals={goals} makeDeposit={makeDeposit} />
      <GoalList goals={goals} deleteGoal={deleteGoal} />
    </div>
  );
}

export default App;
