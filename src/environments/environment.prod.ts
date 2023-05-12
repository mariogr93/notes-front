export const environment = {
  production: true,
  // DOMAIN: 'http://localhost:8080'
  DOMAIN: process.env['DOMAIN'] || 'http://localhost:8080'
};
