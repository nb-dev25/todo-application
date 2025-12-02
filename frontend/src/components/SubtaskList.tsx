import React from 'react';
import type { Subtask } from '../types/todo';
import './SubtaskList.css';

interface SubtaskListProps {
  subtasks: Subtask[];
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  todoId: string;
}

/**
 * SubtaskList Component
 * Displays a list of subtasks/bullets with checkboxes
 */
export const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  onToggleSubtask,
  todoId,
}) => {
  if (subtasks.length === 0) {
    return null;
  }

  const completedCount = subtasks.filter((subtask) => subtask.completed).length;
  const totalCount = subtasks.length;

  return (
    <div className="subtask-list-container">
      <div className="subtask-progress">
        <span className="progress-text">
          {completedCount}/{totalCount} completed
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
      <ul className="subtask-list">
        {subtasks.map((subtask) => (
          <li key={subtask.id} className="subtask-item">
            <label className="subtask-label">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => onToggleSubtask(todoId, subtask.id)}
                className="subtask-checkbox"
              />
              <span className={`subtask-text ${subtask.completed ? 'completed' : ''}`}>
                {subtask.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

