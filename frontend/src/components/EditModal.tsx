import React, { useState, useEffect, FormEvent } from 'react';
import type { Todo, UpdateTodoDTO, Subtask } from '../types/todo';
import './EditModal.css';

interface EditModalProps {
  todo: Todo | null;
  onClose: () => void;
  onSave: (id: string, data: UpdateTodoDTO) => void;
  isLoading?: boolean;
}

/**
 * EditModal Component
 * Modal dialog for editing existing todo items
 */
export const EditModal: React.FC<EditModalProps> = ({
  todo,
  onClose,
  onSave,
  isLoading = false,
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
      setSubtasks(todo.subtasks || []);
    }
  }, [todo]);

  // Prevent body scroll when modal is open and add class
  useEffect(() => {
    if (todo) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      return () => {
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
      };
    }
  }, [todo]);

  const handleSubtaskChange = (index: number, text: string): void => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { ...newSubtasks[index], text };
    setSubtasks(newSubtasks);
  };

  const handleSubtaskToggle = (index: number): void => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = { ...newSubtasks[index], completed: !newSubtasks[index].completed };
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = (): void => {
    const newSubtask: Subtask = {
      id: `subtask-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      text: '',
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
    
    // Focus the new input after a short delay
    setTimeout(() => {
      const inputs = document.querySelectorAll('.subtask-input');
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
      if (lastInput) {
        lastInput.focus();
      }
    }, 100);
  };

  const handleRemoveSubtask = (index: number): void => {
    const newSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(newSubtasks);
  };

  const handleSubtaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentSubtask = subtasks[index];
      
      // Only add a new subtask if the current one has text
      if (currentSubtask.text.trim().length > 0) {
        handleAddSubtask();
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!todo) return;

    if (!title.trim() || !description.trim()) {
      alert('Please fill in both title and description');
      return;
    }

    const validSubtasks = subtasks.filter((subtask) => subtask.text.trim().length > 0);

    onSave(todo.id, {
      title: title.trim(),
      description: description.trim(),
      completed,
      subtasks: validSubtasks,
    });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!todo) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit To-Do</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            disabled={isLoading}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-form-content">
            <div className="form-group">
              <label htmlFor="edit-title">Title *</label>
              <input
                type="text"
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Description *</label>
              <textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
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
              <div className="subtasks-container">
                {subtasks.length === 0 ? (
                  <p style={{ color: 'var(--text-light)', fontStyle: 'italic', textAlign: 'center', padding: '2rem' }}>
                    No subtasks yet. Click "+ Add Subtask" to create one.
                  </p>
                ) : (
                  subtasks.map((subtask, index) => (
                    <div key={subtask.id} className="subtask-input-group">
                      <span className="subtask-number">{index + 1}.</span>
                      <input
                        type="text"
                        value={subtask.text}
                        onChange={(e) => handleSubtaskChange(index, e.target.value)}
                        onKeyDown={(e) => handleSubtaskKeyDown(e, index)}
                        placeholder="Enter subtask (Press Enter to add another)"
                        disabled={isLoading}
                        className="subtask-input"
                      />
                      <label className="subtask-checkbox-label">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => handleSubtaskToggle(index)}
                          className="subtask-checkbox-inline"
                          disabled={isLoading}
                          title="Mark as done"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubtask(index)}
                        className="btn-remove-subtask"
                        disabled={isLoading}
                        aria-label="Remove subtask"
                        title="Remove subtask"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="form-group checkbox-group">
              <label htmlFor="edit-completed">
                <input
                  type="checkbox"
                  id="edit-completed"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  disabled={isLoading}
                />
                Mark as completed
              </label>
            </div>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

