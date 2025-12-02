import React, { useState, FormEvent } from 'react';
import type { CreateTodoDTO } from '../types/todo';
import './AddToDoForm.css';

interface AddToDoFormProps {
  onSubmit: (data: CreateTodoDTO) => void;
  isLoading?: boolean;
}

/**
 * AddToDoForm Component
 * Form for creating new todo items
 */
export const AddToDoForm: React.FC<AddToDoFormProps> = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subtasks, setSubtasks] = useState<string[]>(['']);

  const handleSubtaskChange = (index: number, value: string): void => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = (): void => {
    setSubtasks([...subtasks, '']);
  };

  const handleRemoveSubtask = (index: number): void => {
    if (subtasks.length > 1) {
      const newSubtasks = subtasks.filter((_, i) => i !== index);
      setSubtasks(newSubtasks);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    const validSubtasks = subtasks.filter((subtask) => subtask.trim().length > 0);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      subtasks: validSubtasks.length > 0 ? validSubtasks : undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSubtasks(['']);
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <h2>Add New To-Do</h2>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          disabled={isLoading}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          rows={3}
          disabled={isLoading}
          required
        />
      </div>
      <div className="form-group">
        <label>
          Subtasks (Bullets)
          <button
            type="button"
            onClick={handleAddSubtask}
            className="btn-add-subtask"
            disabled={isLoading}
          >
            + Add Subtask
          </button>
        </label>
        {subtasks.map((subtask, index) => (
          <div key={index} className="subtask-input-group">
            <input
              type="text"
              value={subtask}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
              placeholder={`Subtask ${index + 1}`}
              disabled={isLoading}
              className="subtask-input"
            />
            {subtasks.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveSubtask(index)}
                className="btn-remove-subtask"
                disabled={isLoading}
                aria-label="Remove subtask"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

