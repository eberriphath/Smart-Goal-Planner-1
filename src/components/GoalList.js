import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, deleteGoal, updateGoal }) {
  return (
    <div>
      <h2>All Goals</h2>
      {goals.map(goal => (
        <GoalItem
          key={goal.id}
          goal={goal}
          deleteGoal={deleteGoal}
          updateGoal={updateGoal}
        />
      ))}
    </div>
  );
}

export default GoalList;
