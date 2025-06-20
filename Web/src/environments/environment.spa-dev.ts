// environment.spa-dev.ts (desarrollo SPA - Angular + Golang juntos)
export const environment = {
  production: false,
  mode: 'spa-dev',
  apiUrl: '/api',  // Ruta relativa cuando está integrado con Golang
  appName: 'Portal del Abogado (SPA Dev)',
  version: '1.0.0',
  apiTimeout: 5000,
  enableLogging: true,
  enableAnalytics: false
};