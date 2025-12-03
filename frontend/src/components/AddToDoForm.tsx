import React, { useState, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [dueDate, setDueDate] = useState<Date | null>(null);

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
      dueDate: dueDate ? dueDate.toISOString() : undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSubtasks(['']);
    setDueDate(null);
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
        <label htmlFor="dueDate">Due Date</label>
        <div className="date-picker-container">
          <DatePicker
            id="dueDate"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="MMM dd, yyyy"
            placeholderText="Select due date (optional)"
            className="date-picker-input"
            wrapperClassName="date-picker-wrapper"
            disabled={isLoading}
            minDate={new Date()}
            showPopperArrow={false}
            calendarStartDay={0}
          />
          <svg className="calendar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
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

