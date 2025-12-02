import { useState, useEffect } from 'react';
import type { Todo, CreateTodoDTO, UpdateTodoDTO } from './types/todo';
import { mockApi } from './services/mockApi';
import { ToDoList } from './components/ToDoList';
import { AddToDoForm } from './components/AddToDoForm';
import { EditModal } from './components/EditModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
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
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleScroll = (): void => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const scrollY = window.scrollY;
        
        // Add hysteresis: different thresholds for hide/show
        if (scrollY > 120 && !isScrolled) {
          setIsScrolled(true);
        } else if (scrollY < 60 && isScrolled) {
          setIsScrolled(false);
        }
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
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

  return (
    <>
      <div className="app">
        <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header-logo">
            <img src="/spt-logo.png" alt="Shona Prince Technologies" className="logo" />
          </div>
          <h1>To-Do Application</h1>
        </header>

        <main className="app-main">
          {error && <ErrorMessage message={error} onDismiss={handleDismissError} />}

          <AddToDoForm onSubmit={handleCreateTodo} isLoading={isSubmitting} />

          <section className="todos-section">
            <h2>Your To-Dos</h2>
            {isLoading ? (
              <LoadingSpinner message="Loading todos..." />
            ) : (
              <ToDoList
                todos={todos}
                onToggleComplete={handleToggleComplete}
                onToggleSubtask={handleToggleSubtask}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
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
    </>
  );
}

export default App;

