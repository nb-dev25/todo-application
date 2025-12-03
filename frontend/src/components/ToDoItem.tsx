import React, { useState } from 'react';
import type { Todo } from '../types/todo';
import { SubtaskList } from './SubtaskList';
import { ConfirmDialog } from './ConfirmDialog';
import './ToDoItem.css';

interface ToDoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

/**
 * ToDoItem Component
 * Displays a single todo item with actions (complete, edit, delete)
 * Expandable to show subtasks
 */
export const ToDoItem: React.FC<ToDoItemProps> = ({
  todo,
  onToggleComplete,
  onToggleSubtask,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const hasSubtasks = todo.subtasks && todo.subtasks.length > 0;

  // Calculate completion percentage
  const calculatePercentage = (): number => {
    if (!hasSubtasks) return 0;
    const completed = todo.subtasks.filter((st) => st.completed).length;
    const total = todo.subtasks.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const completionPercentage = calculatePercentage();

  // Format due date for display
  const formatDueDate = (dateString?: string): string | null => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return null;
    }
  };

  // Check if due date is overdue
  const isOverdue = (dateString?: string): boolean => {
    if (!dateString || todo.completed) return false;
    try {
      const dueDate = new Date(dateString);
      dueDate.setHours(23, 59, 59, 999);
      return dueDate < new Date();
    } catch {
      return false;
    }
  };

  const dueDateFormatted = formatDueDate(todo.dueDate);
  const overdue = isOverdue(todo.dueDate);

  const handleToggle = (): void => {
    onToggleComplete(todo.id);
  };

  const handleEdit = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onEdit(todo);
  };

  const handleDelete = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const confirmDelete = (): void => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = (): void => {
    setShowDeleteConfirm(false);
  };

  const handleCardClick = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleSubtaskClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <>
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete To-Do"
          message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <div
        className={`todo-item ${todo.completed ? 'completed' : ''} expandable ${isExpanded ? 'expanded' : ''}`}
        onClick={handleCardClick}
      >
      <div className="todo-item-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="todo-text">
          <div className="todo-header">
            <div className="todo-title-group">
              <h3 className="todo-title">{todo.title}</h3>
              {hasSubtasks && (
                <span className={`todo-percentage ${completionPercentage === 100 ? 'completed' : ''}`}>
                  {completionPercentage}%
                </span>
              )}
            </div>
          </div>
          <p className="todo-description">{todo.description}</p>
          {dueDateFormatted && (
            <div className={`todo-due-date ${overdue ? 'overdue' : ''}`}>
              <span className="due-date-label">Due:</span>
              <span className="due-date-value">{dueDateFormatted}</span>
              {overdue && <span className="overdue-badge">Overdue</span>}
            </div>
          )}
          {isExpanded && hasSubtasks && (
            <div onClick={handleSubtaskClick}>
              <SubtaskList
                subtasks={todo.subtasks}
                onToggleSubtask={onToggleSubtask}
                todoId={todo.id}
              />
            </div>
          )}
          {isExpanded && (
            <div className="todo-actions-bottom" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={handleEdit}
                className="btn btn-edit"
                aria-label={`Edit "${todo.title}"`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-delete"
                aria-label={`Delete "${todo.title}"`}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="todo-header-actions" onClick={(e) => e.stopPropagation()}>
        <button
          className="expand-button"
          onClick={handleCardClick}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </button>
      </div>
      </div>
    </>
  );
};

