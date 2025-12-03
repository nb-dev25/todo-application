# Environment Configuration Guide

## Overview

This To-Do Application uses environment variables for configuration. This allows you to customize the application behavior without changing the code.

## Setup Instructions

### 1. Create Your Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

### 2. Configure Your Settings

Edit the `.env` file to customize your application:

```env
# Development Server Port (change this to your preferred port)
VITE_PORT=3000

# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000

# Application Configuration
VITE_APP_NAME="To-Do Application"
VITE_APP_VERSION=1.0.0
VITE_APP_COMPANY="Shona Prince Technologies"

# Feature Flags
VITE_ENABLE_ERROR_SIMULATION=true
VITE_ERROR_RATE=0.1

# Mock API Delays (milliseconds)
VITE_API_DELAY_GET=800
VITE_API_DELAY_POST=600
VITE_API_DELAY_PUT=500
VITE_API_DELAY_DELETE=400
```

## Available Configuration Options

### Server Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_PORT` | Development server port | `3000` | `3000`, `8080`, `5173` |

### API Configuration

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` | `https://api.example.com` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` | `15000` |

### Application Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_NAME` | Application name | `To-Do Application` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_APP_COMPANY` | Company name | `Shona Prince Technologies` |

### Feature Flags

| Variable | Description | Default | Values |
|----------|-------------|---------|--------|
| `VITE_ENABLE_ERROR_SIMULATION` | Enable mock API errors | `true` | `true`, `false` |
| `VITE_ERROR_RATE` | Error simulation rate | `0.1` | `0.0` - `1.0` |

### Mock API Delays

| Variable | Description | Default | Range |
|----------|-------------|---------|-------|
| `VITE_API_DELAY_GET` | GET request delay (ms) | `800` | `0` - `5000` |
| `VITE_API_DELAY_POST` | POST request delay (ms) | `600` | `0` - `5000` |
| `VITE_API_DELAY_PUT` | PUT request delay (ms) | `500` | `0` - `5000` |
| `VITE_API_DELAY_DELETE` | DELETE request delay (ms) | `400` | `0` - `5000` |

## Usage Examples

### Example 1: Change Port to 8080

```env
VITE_PORT=8080
```

Then run:
```bash
npm run dev
```

Your app will now run on `http://localhost:8080`

### Example 2: Disable Error Simulation

For a smoother demo experience:

```env
VITE_ENABLE_ERROR_SIMULATION=false
VITE_ERROR_RATE=0
```

### Example 3: Faster API Responses

For quicker testing:

```env
VITE_API_DELAY_GET=200
VITE_API_DELAY_POST=200
VITE_API_DELAY_PUT=200
VITE_API_DELAY_DELETE=200
```

### Example 4: Production Configuration

Use `.env.production` for production builds:

```env
VITE_PORT=5000
VITE_API_URL=https://api.shonatech.africa/api
VITE_ENABLE_ERROR_SIMULATION=false
VITE_ERROR_RATE=0
```

Build for production:
```bash
npm run build
npm run preview
```

## Environment Files

- `.env` - Development configuration (not committed to git)
- `.env.example` - Template file (committed to git)
- `.env.production` - Production configuration (committed to git)
- `.env.local` - Local overrides (not committed to git)

## Accessing Environment Variables in Code

Environment variables are accessed through the `config` object:

```typescript
import config from './config/env';

// Application info
console.log(config.app.name);
console.log(config.app.version);

// API configuration
console.log(config.api.url);
console.log(config.api.timeout);

// Feature flags
if (config.features.enableErrorSimulation) {
  // Simulate errors
}

// Delays
await delay(config.delays.get);
```

## Security Notes

⚠️ **Important:**
- Never commit `.env` files with sensitive data
- Use `.env.example` as a template
- Keep API keys and secrets in `.env.local`
- All `VITE_*` variables are exposed to the client

## Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

1. Change `VITE_PORT` to a different port (e.g., `3001`, `8080`)
2. Or kill the process using that port

### Environment Variables Not Loading

1. Make sure your `.env` file is in the `frontend/` directory
2. Restart the development server after changing `.env`
3. Environment variables must start with `VITE_` to be accessible

### Changes Not Reflecting

After modifying `.env`:
1. Stop the dev server (Ctrl+C)
2. Run `npm run dev` again

## NPM Scripts

```bash
# Development (uses .env)
npm run dev

# Build for production (uses .env.production)
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

**Shona Prince Technologies** | Built with React & TypeScript




