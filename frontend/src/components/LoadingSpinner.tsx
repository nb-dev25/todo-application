import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * LoadingSpinner Component
 * Displays a loading indicator with optional message
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
}) => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner" aria-label="Loading"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};



