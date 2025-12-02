import React, { useState, useEffect, FormEvent } from 'react';
import type { CreateTodoDTO } from '../types/todo';
import { AddToDoForm } from './AddToDoForm';
import './AddTodoModal.css';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTodoDTO) => void;
  isLoading?: boolean;
}

/**
 * AddTodoModal Component
 * Modal dialog for creating new todo items
 */
export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      return () => {
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  const handleSubmit = (data: CreateTodoDTO): void => {
    onSubmit(data);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey);
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="add-todo-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-todo-modal">
        <button
          className="add-todo-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="add-todo-modal-content">
          <AddToDoForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

