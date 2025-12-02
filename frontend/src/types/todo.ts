/**
 * Subtask/Bullet Interface
 * Represents a single subtask within a todo
 */
export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

/**
 * To-Do Item Interface
 * Represents a single to-do item with all its properties
 */
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  subtasks: Subtask[];
  createdAt: string;
  updatedAt: string;
}

/**
 * API Response Interface for GET requests
 * Wraps the array of todos in a response object
 */
export interface GetTodosResponse {
  todos: Todo[];
  success: boolean;
  message?: string;
}

/**
 * API Response Interface for POST/PUT requests
 * Returns a single todo item
 */
export interface TodoResponse {
  todo: Todo;
  success: boolean;
  message?: string;
}

/**
 * API Response Interface for DELETE requests
 */
export interface DeleteResponse {
  success: boolean;
  message?: string;
}

/**
 * Create Todo DTO (Data Transfer Object)
 * Used when creating a new todo item
 */
export interface CreateTodoDTO {
  title: string;
  description: string;
  subtasks?: string[];
}

/**
 * Update Todo DTO
 * Used when updating an existing todo item
 */
export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
  subtasks?: Subtask[];
}

