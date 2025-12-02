import type { Todo, Subtask, GetTodosResponse, TodoResponse, DeleteResponse, CreateTodoDTO, UpdateTodoDTO } from '../types/todo';
import config from '../config/env';

/**
 * Simulated network delay to mimic real API behavior
 * @param ms - Milliseconds to delay
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Simulated failure rate (configurable via environment)
 * Used to demonstrate error handling
 */
const shouldFail = (): boolean => {
  if (!config.features.enableErrorSimulation) {
    return false;
  }
  return Math.random() < config.features.errorRate;
};

/**
 * Mock data storage (simulates a database)
 * In a real application, this would be a backend database
 */
let mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Complete React Assessment',
    description: 'Build a comprehensive To-Do application using React and TypeScript',
    completed: false,
    subtasks: [
      { id: 's1-1', text: 'Set up project structure', completed: true },
      { id: 's1-2', text: 'Create TypeScript interfaces', completed: true },
      { id: 's1-3', text: 'Implement mock API', completed: true },
      { id: 's1-4', text: 'Build UI components', completed: true },
      { id: 's1-5', text: 'Add subtask functionality', completed: true },
      { id: 's1-6', text: 'Implement toast notifications', completed: true },
      { id: 's1-7', text: 'Add responsive design', completed: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Set Up CI/CD Pipeline',
    description: 'Configure continuous integration and deployment for the project',
    completed: false,
    subtasks: [
      { id: 's2-1', text: 'Configure GitHub Actions', completed: true },
      { id: 's2-2', text: 'Set up automated testing', completed: true },
      { id: 's2-3', text: 'Configure deployment scripts', completed: false },
      { id: 's2-4', text: 'Set up environment variables', completed: false },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Optimize Application Performance',
    description: 'Improve load times and optimize React rendering performance',
    completed: false,
    subtasks: [
      { id: 's3-1', text: 'Implement code splitting', completed: false },
      { id: 's3-2', text: 'Add React.memo for components', completed: false },
      { id: 's3-3', text: 'Optimize bundle size', completed: false },
      { id: 's3-4', text: 'Add lazy loading', completed: false },
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    title: 'Implement Authentication System',
    description: 'Add user authentication with JWT tokens and secure routes',
    completed: true,
    subtasks: [
      { id: 's4-1', text: 'Design authentication flow', completed: true },
      { id: 's4-2', text: 'Implement login API', completed: true },
      { id: 's4-3', text: 'Add JWT token management', completed: true },
      { id: 's4-4', text: 'Create protected routes', completed: true },
      { id: 's4-5', text: 'Add logout functionality', completed: true },
    ],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '5',
    title: 'Write Unit Tests',
    description: 'Create comprehensive unit tests for all components and utilities',
    completed: false,
    subtasks: [
      { id: 's5-1', text: 'Set up Jest and React Testing Library', completed: true },
      { id: 's5-2', text: 'Write component tests', completed: true },
      { id: 's5-3', text: 'Write utility function tests', completed: false },
      { id: 's5-4', text: 'Add integration tests', completed: false },
      { id: 's5-5', text: 'Achieve 80% code coverage', completed: false },
    ],
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: '6',
    title: 'Design Database Schema',
    description: 'Create database schema for user data and todo items',
    completed: false,
    subtasks: [
      { id: 's6-1', text: 'Design user table schema', completed: true },
      { id: 's6-2', text: 'Design todo table schema', completed: true },
      { id: 's6-3', text: 'Create relationships', completed: false },
      { id: 's6-4', text: 'Add indexes for performance', completed: false },
    ],
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: '7',
    title: 'Implement Search and Filter',
    description: 'Add search functionality and filtering options for todos',
    completed: false,
    subtasks: [
      { id: 's7-1', text: 'Create search input component', completed: false },
      { id: 's7-2', text: 'Implement search algorithm', completed: false },
      { id: 's7-3', text: 'Add filter by status', completed: false },
      { id: 's7-4', text: 'Add filter by date', completed: false },
    ],
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    updatedAt: new Date(Date.now() - 518400000).toISOString(),
  },
  {
    id: '8',
    title: 'Deploy to Production',
    description: 'Deploy the application to production environment',
    completed: false,
    subtasks: [
      { id: 's8-1', text: 'Set up production server', completed: true },
      { id: 's8-2', text: 'Configure domain and SSL', completed: false },
      { id: 's8-3', text: 'Set up monitoring', completed: false },
      { id: 's8-4', text: 'Perform final testing', completed: false },
    ],
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    updatedAt: new Date(Date.now() - 604800000).toISOString(),
  },
];

/**
 * Generate a unique ID for new todos or subtasks
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Convert string array to Subtask array
 */
const createSubtasks = (subtaskTexts: string[] = []): Subtask[] => {
  return subtaskTexts
    .filter((text) => text.trim().length > 0)
    .map((text) => ({
      id: generateId(),
      text: text.trim(),
      completed: false,
    }));
};

/**
 * Mock API Service
 * Simulates REST API endpoints with proper delays and error handling
 */
export const mockApi = {
  /**
   * GET /todos
   * Fetches all todo items
   * @returns Promise<GetTodosResponse>
   */
  getTodos: async (): Promise<GetTodosResponse> => {
    await delay(config.delays.get); // Simulate network latency

    if (shouldFail()) {
      throw new Error('Failed to fetch todos. Please try again later.');
    }

    return {
      todos: [...mockTodos],
      success: true,
      message: 'Todos fetched successfully',
    };
  },

  /**
   * POST /todos
   * Creates a new todo item
   * @param data - Todo data to create
   * @returns Promise<TodoResponse>
   */
  createTodo: async (data: CreateTodoDTO): Promise<TodoResponse> => {
    await delay(config.delays.post); // Simulate network latency

    if (shouldFail()) {
      throw new Error('Failed to create todo. Please try again.');
    }

    const newTodo: Todo = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description.trim(),
      completed: false,
      subtasks: createSubtasks(data.subtasks),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTodos = [...mockTodos, newTodo];

    return {
      todo: newTodo,
      success: true,
      message: 'Todo created successfully',
    };
  },

  /**
   * PUT /todos/:id
   * Updates an existing todo item
   * @param id - Todo ID to update
   * @param data - Updated todo data
   * @returns Promise<TodoResponse>
   */
  updateTodo: async (id: string, data: UpdateTodoDTO): Promise<TodoResponse> => {
    await delay(config.delays.put); // Simulate network latency

    if (shouldFail()) {
      throw new Error('Failed to update todo. Please try again.');
    }

    const todoIndex = mockTodos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo: Todo = {
      ...mockTodos[todoIndex],
      ...data,
      subtasks: data.subtasks !== undefined ? data.subtasks : mockTodos[todoIndex].subtasks,
      updatedAt: new Date().toISOString(),
    };

    mockTodos = mockTodos.map((todo) => (todo.id === id ? updatedTodo : todo));

    return {
      todo: updatedTodo,
      success: true,
      message: 'Todo updated successfully',
    };
  },

  /**
   * DELETE /todos/:id
   * Deletes a todo item
   * @param id - Todo ID to delete
   * @returns Promise<DeleteResponse>
   */
  deleteTodo: async (id: string): Promise<DeleteResponse> => {
    await delay(config.delays.delete); // Simulate network latency

    if (shouldFail()) {
      throw new Error('Failed to delete todo. Please try again.');
    }

    const todoIndex = mockTodos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    mockTodos = mockTodos.filter((todo) => todo.id !== id);

    return {
      success: true,
      message: 'Todo deleted successfully',
    };
  },
};

