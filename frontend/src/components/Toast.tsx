import React, { useEffect } from 'react';
import './Toast.css';

type ToastVariant = 'success' | 'complete' | 'incomplete' | 'delete';

interface ToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
  variant?: ToastVariant;
}

/**
 * Toast Component
 * Displays success messages in the top right corner
 */
export const Toast: React.FC<ToastProps> = ({ 
  message, 
  onDismiss, 
  duration = 3000,
  variant = 'success'
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onDismiss]);

  const getIcon = (): string => {
    if (variant === 'incomplete' || variant === 'delete') {
      return '×';
    }
    return '✓';
  };

  return (
    <div className={`toast toast-${variant}`} role="alert" aria-live="polite">
      <div className="toast-content">
        <span className={`toast-icon toast-icon-${variant}`}>{getIcon()}</span>
        <span className="toast-text">{message}</span>
      </div>
      <button
        className="toast-dismiss"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

