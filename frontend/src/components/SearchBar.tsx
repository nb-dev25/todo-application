import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css';

export type StatusFilter = 'all' | 'completed' | 'pending';
export type DateFilter = 'all' | 'custom';

interface SearchBarProps {
  searchQuery: string;
  statusFilter: StatusFilter;
  dateFilter: DateFilter;
  customDateStart?: string;
  customDateEnd?: string;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: StatusFilter) => void;
  onDateFilterChange: (date: DateFilter) => void;
  onCustomDateChange: (start?: string, end?: string) => void;
}

/**
 * SearchBar Component
 * Provides search and filtering functionality for todos
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  statusFilter,
  dateFilter,
  customDateStart,
  customDateEnd,
  onSearchChange,
  onStatusFilterChange,
  onDateFilterChange,
  onCustomDateChange,
}) => {
  const handleCustomDateToggle = (): void => {
    if (dateFilter === 'custom') {
      onDateFilterChange('all');
      onCustomDateChange(undefined, undefined);
    } else {
      onDateFilterChange('custom');
    }
  };

  const handleCustomDateStartChange = (date: Date | null): void => {
    const dateString = date ? date.toISOString().split('T')[0] : undefined;
    onCustomDateChange(dateString, customDateEnd);
  };

  const handleCustomDateEndChange = (date: Date | null): void => {
    const dateString = date ? date.toISOString().split('T')[0] : undefined;
    onCustomDateChange(customDateStart, dateString);
  };

  const startDate = customDateStart ? new Date(customDateStart) : null;
  const endDate = customDateEnd ? new Date(customDateEnd) : null;

  return (
    <div className="search-bar-container">
      <div className="search-bar-content">
        {/* Search Input */}
        <div className="search-input-group">
          <label htmlFor="search-input">Search Todos</label>
          <div className="search-input-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              id="search-input"
              className="search-input"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <label>Status</label>
          <div className="filter-buttons">
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => onStatusFilterChange('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
              onClick={() => onStatusFilterChange('completed')}
            >
              Completed
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
              onClick={() => onStatusFilterChange('pending')}
            >
              Pending
            </button>
          </div>
        </div>

        {/* Date Filter - Custom Range */}
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={dateFilter === 'custom'}
              onChange={handleCustomDateToggle}
              className="date-filter-checkbox"
            />
            <span>Filter by Date Range</span>
          </label>
          {dateFilter === 'custom' && (
            <div className="custom-date-range">
              <div className="date-inputs">
                <div className="date-input-group">
                  <label htmlFor="date-start">Start Date</label>
                  <div className="date-picker-container">
                    <DatePicker
                      id="date-start"
                      selected={startDate}
                      onChange={handleCustomDateStartChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="MMM dd, yyyy"
                      placeholderText="Select start date"
                      className="date-picker-input"
                      wrapperClassName="date-picker-wrapper"
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
                <div className="date-input-group">
                  <label htmlFor="date-end">End Date</label>
                  <div className="date-picker-container">
                    <DatePicker
                      id="date-end"
                      selected={endDate}
                      onChange={handleCustomDateEndChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate || undefined}
                      dateFormat="MMM dd, yyyy"
                      placeholderText="Select end date"
                      className="date-picker-input"
                      wrapperClassName="date-picker-wrapper"
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

