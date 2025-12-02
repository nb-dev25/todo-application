import React from 'react';
import type { Todo } from '../types/todo';
import { ToDoItem } from './ToDoItem';
import './ToDoList.css';

interface ToDoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

/**
 * ToDoList Component
 * Renders a list of todo items
 */
export const ToDoList: React.FC<ToDoListProps> = ({
  todos,
  onToggleComplete,
  onToggleSubtask,
  onEdit,
  onDelete,
}) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos yet. Add your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onToggleSubtask={onToggleSubtask}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

