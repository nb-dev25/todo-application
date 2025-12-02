/**
 * Environment Configuration
 * Centralized access to environment variables
 */

export const config = {
  // Application Info
  app: {
    name: import.meta.env.VITE_APP_NAME || 'To-Do Application',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    company: import.meta.env.VITE_APP_COMPANY || 'Shona Prince Technologies',
  },

  // API Configuration
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },

  // Feature Flags
  features: {
    enableErrorSimulation: import.meta.env.VITE_ENABLE_ERROR_SIMULATION === 'true',
    errorRate: parseFloat(import.meta.env.VITE_ERROR_RATE) || 0.1,
  },

  // Mock API Delays
  delays: {
    get: parseInt(import.meta.env.VITE_API_DELAY_GET) || 800,
    post: parseInt(import.meta.env.VITE_API_DELAY_POST) || 600,
    put: parseInt(import.meta.env.VITE_API_DELAY_PUT) || 500,
    delete: parseInt(import.meta.env.VITE_API_DELAY_DELETE) || 400,
  },

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

export default config;

