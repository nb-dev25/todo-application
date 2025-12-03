import { useState, useEffect, useMemo } from 'react';
import type { Todo, CreateTodoDTO, UpdateTodoDTO } from './types/todo';
import { mockApi } from './services/mockApi';
import { ToDoList } from './components/ToDoList';
import { AddTodoModal } from './components/AddTodoModal';
import { EditModal } from './components/EditModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Toast } from './components/Toast';
import { SearchBar, type StatusFilter, type DateFilter } from './components/SearchBar';
import './App.css';

/**
 * Main App Component
 * Manages application state and handles all API interactions
 */
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; variant?: 'success' | 'complete' | 'incomplete' | 'delete' } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customDateStart, setCustomDateStart] = useState<string | undefined>(undefined);
  const [customDateEnd, setCustomDateEnd] = useState<string | undefined>(undefined);

  /**
   * Fetch todos on component mount
   * Demonstrates useEffect hook for side effects
   */
  useEffect(() => {
    fetchTodos();
  }, []);

  /**
   * Smooth scroll handler with hysteresis to prevent flickering
   */
  useEffect(() => {
    let rafId: number | null = null;
    let lastKnownScrollY = 0;
    
    const handleScroll = (): void => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Only update if scroll position has changed significantly
          if (Math.abs(scrollY - lastKnownScrollY) > 5) {
            // Add hysteresis: different thresholds for hide/show to prevent flickering
            if (scrollY > 80 && !isScrolled) {
              setIsScrolled(true);
            } else if (scrollY < 30 && isScrolled) {
              setIsScrolled(false);
            }
            lastKnownScrollY = scrollY;
          }
          
          rafId = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isScrolled]);

  /**
   * Fetch all todos from the API
   */
  const fetchTodos = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApi.getTodos();
      setTodos(response.todos);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch todos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle creating a new todo
   */
  const handleCreateTodo = async (data: CreateTodoDTO): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await mockApi.createTodo(data);
      setTodos((prevTodos) => [...prevTodos, response.todo]);
      setToast({ message: 'Successfully added!', variant: 'success' });
      setIsAddModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create todo';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle updating an existing todo
   */
  const handleUpdateTodo = async (id: string, data: UpdateTodoDTO): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await mockApi.updateTodo(id, data);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response.todo : todo))
      );
      setEditingTodo(null); // Close modal after successful update
      setToast({ message: 'Task edited successfully!', variant: 'success' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle toggling todo completion status
   */
  const handleToggleComplete = async (id: string): Promise<void> => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await mockApi.updateTodo(id, { completed: !todo.completed });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? response.todo : t))
      );
      // Show toast message based on completion status
      if (!todo.completed) {
        setToast({ message: 'Task marked as complete!', variant: 'complete' });
      } else {
        setToast({ message: 'Task marked as incomplete!', variant: 'incomplete' });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update todo';
      setError(errorMessage);
    }
  };

  /**
   * Handle toggling subtask completion status
   */
  const handleToggleSubtask = async (todoId: string, subtaskId: string): Promise<void> => {
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    const updatedSubtasks = todo.subtasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );

    try {
      const response = await mockApi.updateTodo(todoId, { subtasks: updatedSubtasks });
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todoId ? response.todo : t))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update subtask';
      setError(errorMessage);
    }
  };

  /**
   * Handle deleting a todo
   */
  const handleDeleteTodo = async (id: string): Promise<void> => {
    setError(null);

    try {
      await mockApi.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setToast({ message: 'Task deleted successfully!', variant: 'success' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete todo';
      setError(errorMessage);
    }
  };

  /**
   * Handle opening edit modal
   */
  const handleEditTodo = (todo: Todo): void => {
    setEditingTodo(todo);
    setError(null);
  };

  /**
   * Handle closing edit modal
   */
  const handleCloseModal = (): void => {
    setEditingTodo(null);
  };

  /**
   * Handle dismissing error message
   */
  const handleDismissError = (): void => {
    setError(null);
  };

  /**
   * Handle dismissing toast message
   */
  const handleDismissToast = (): void => {
    setToast(null);
  };

  /**
   * Handle opening add todo modal
   */
  const handleOpenAddModal = (): void => {
    setIsAddModalOpen(true);
  };

  /**
   * Handle closing add todo modal
   */
  const handleCloseAddModal = (): void => {
    setIsAddModalOpen(false);
  };

  /**
   * Filter todos based on search query, status, and date filters
   */
  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    // Date filter - Custom Range only
    if (dateFilter === 'custom') {
      filtered = filtered.filter((todo) => {
        if (!todo.dueDate) {
          // If no due date, exclude from custom date filter
          return false;
        }

        if (!customDateStart && !customDateEnd) return true;

        const dueDate = new Date(todo.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        
        const start = customDateStart ? new Date(customDateStart) : null;
        const end = customDateEnd ? new Date(customDateEnd) : null;
        
        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);
        
        if (start && end) {
          return dueDate >= start && dueDate <= end;
        } else if (start) {
          return dueDate >= start;
        } else if (end) {
          return dueDate <= end;
        }
        return true;
      });
    }

    return filtered;
  }, [todos, searchQuery, statusFilter, dateFilter, customDateStart, customDateEnd]);

  return (
    <>
      <div className={`app ${isScrolled ? 'header-scrolled' : ''}`}>
        <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-logo">
            <img src="/spt-logo.png" alt="Shona Prince Technologies" className="logo" />
          </div>
          <h1>To-Do Application</h1>
        </header>

        {toast && (
          <Toast 
            message={toast.message} 
            onDismiss={handleDismissToast}
            variant={toast.variant}
          />
        )}

        <button
          className={`add-todo-button ${isScrolled ? 'header-scrolled' : ''}`}
          onClick={handleOpenAddModal}
          aria-label="Add new todo"
        >
          ADD TO-DO
        </button>

        <main className="app-main">
          {error && <ErrorMessage message={error} onDismiss={handleDismissError} />}

          <section className="todos-section">
            <h2>Your To-Dos</h2>
            {isLoading ? (
              <LoadingSpinner message="Loading todos..." />
            ) : (
              <>
                <SearchBar
                  searchQuery={searchQuery}
                  statusFilter={statusFilter}
                  dateFilter={dateFilter}
                  customDateStart={customDateStart}
                  customDateEnd={customDateEnd}
                  onSearchChange={setSearchQuery}
                  onStatusFilterChange={setStatusFilter}
                  onDateFilterChange={setDateFilter}
                  onCustomDateChange={(start, end) => {
                    setCustomDateStart(start);
                    setCustomDateEnd(end);
                  }}
                />
                {filteredTodos.length === 0 ? (
                  <div className="todo-list-empty">
                    <p>
                      {searchQuery || statusFilter !== 'all' || dateFilter !== 'all'
                        ? 'No todos match your filters. Try adjusting your search criteria.'
                        : 'No todos yet. Add your first todo to get started!'}
                    </p>
                  </div>
                ) : (
                  <ToDoList
                    todos={filteredTodos}
                    onToggleComplete={handleToggleComplete}
                    onToggleSubtask={handleToggleSubtask}
                    onEdit={handleEditTodo}
                    onDelete={handleDeleteTodo}
                  />
                )}
              </>
            )}
          </section>
        </main>

        <footer className="app-footer">
          <p>© 2025 Shona Prince Technologies | Built with React & TypeScript</p>
        </footer>
      </div>

      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onClose={handleCloseModal}
          onSave={handleUpdateTodo}
          isLoading={isSubmitting}
        />
      )}

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleCreateTodo}
        isLoading={isSubmitting}
      />
    </>
  );
}

export default App;

