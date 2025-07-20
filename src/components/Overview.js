import React from 'react';

function Overview({ goals }) {
  const totalGoals = goals.length;

  const totalSaved = goals.reduce((sum, goal) => sum + parseFloat(goal.savedAmount), 0);

  const goalsCompleted = goals.filter(goal => parseFloat(goal.savedAmount) >= parseFloat(goal.targetAmount)).length;

  const today = new Date();

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Money Saved: ${totalSaved}</p>
      <p>Goals Completed: {goalsCompleted}</p>

      <ul>
        {goals.map(goal => {
          const daysLeft = Math.ceil((new Date(goal.deadline) - today) / (1000 * 60 * 60 * 24));
          let warning = '';

          if (daysLeft < 0 && parseFloat(goal.savedAmount) < parseFloat(goal.targetAmount)) {
            warning = 'Overdue';
          } else if (daysLeft < 30 && parseFloat(goal.savedAmount) < parseFloat(goal.targetAmount)) {
            warning = '⚠️ Deadline Approaching';
          }

          return (
            <li key={goal.id}>
              {goal.name}: {warning} ({daysLeft >= 0 ? daysLeft + ' days left' : 'Past Deadline'})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
