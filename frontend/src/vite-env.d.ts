/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_COMPANY: string
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_ERROR_SIMULATION: string
  readonly VITE_ERROR_RATE: string
  readonly VITE_API_DELAY_GET: string
  readonly VITE_API_DELAY_POST: string
  readonly VITE_API_DELAY_PUT: string
  readonly VITE_API_DELAY_DELETE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}




