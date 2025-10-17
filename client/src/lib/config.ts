// Environment configuration
export const config = {
  // API URL - defaults to localhost for development
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Feature flags
  enableAI: import.meta.env.VITE_ENABLE_AI !== 'false',
  enableBlockchain: import.meta.env.VITE_ENABLE_BLOCKCHAIN !== 'false',
  
  // Development mode
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
