import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    // Server configuration
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      host: true,
      open: true, // Auto-open browser on server start
    },
    
    // Preview configuration (for production build preview)
    preview: {
      port: parseInt(env.VITE_PORT) || 5000,
      host: true,
      open: true,
    },
    
    // Define global constants
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
      __APP_NAME__: JSON.stringify(env.VITE_APP_NAME),
    },
  }
})

