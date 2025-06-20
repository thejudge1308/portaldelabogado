// environment.spa-prod.ts (producción SPA)
export const environment = {
  production: true,
  mode: 'spa-production',
  apiUrl: '/api',  // Ruta relativa - Golang sirve todo
  appName: 'Portal del Abogado',
  version: '1.0.0',
  apiTimeout: 10000,
  enableLogging: false,
  enableAnalytics: true
};