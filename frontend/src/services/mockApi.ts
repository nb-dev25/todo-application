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
      { id: 's1-4', text: 'Build UI components', completed: false },
      { id: 's1-5', text: 'Add subtask functionality', completed: false },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review TypeScript Best Practices',
    description: 'Ensure all code follows strict TypeScript guidelines',
    completed: true,
    subtasks: [
      { id: 's2-1', text: 'Check type definitions', completed: true },
      { id: 's2-2', text: 'Verify no any types', completed: true },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Implement Error Handling',
    description: 'Add proper error handling and user feedback mechanisms',
    completed: false,
    subtasks: [],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
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

