import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals }) {
  return (
    <div>
      <h2>All Goals</h2>
      {goals.map(goal => (
        <GoalItem key={goal.id} goal={goal} />
      ))}
    </div>
  );
}

export default GoalList;
