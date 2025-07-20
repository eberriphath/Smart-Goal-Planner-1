import React, { useState } from 'react';

function GoalItem({ goal, deleteGoal, updateGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });

  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  let status = '';
  if (daysLeft < 0) {
    status = 'Overdue';
  } else if (daysLeft < 30) {
    status = '⚠️ Deadline Approaching';
  }

  function handleChange(e) {
    setEditedGoal({ ...editedGoal, [e.target.name]: e.target.value });
  }

  function handleSave() {
    updateGoal(editedGoal);
    setIsEditing(false);
  }

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      {isEditing ? (
        <div>
          <input
            name="name"
            value={editedGoal.name}
            onChange={handleChange}
          />
          <input
            name="targetAmount"
            type="number"
            value={editedGoal.targetAmount}
            onChange={handleChange}
          />
          <input
            name="category"
            value={editedGoal.category}
            onChange={handleChange}
          />
          <input
            name="deadline"
            type="date"
            value={editedGoal.deadline}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{goal.name}</h3>
          <p>Category: {goal.category}</p>
          <p>Target: ${goal.targetAmount}</p>
          <p>Saved: ${goal.savedAmount}</p>
          <p>Remaining: ${remaining}</p>
          <p>Deadline: {goal.deadline} ({status})</p>

          <div style={{ width: '100%', backgroundColor: '#eee' }}>
            <div
              style={{
                width: `${progress}%`,
                backgroundColor: 'green',
                height: '10px'
              }}
            ></div>
          </div>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteGoal(goal.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default GoalItem;
