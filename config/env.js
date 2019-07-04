/*
 ** Environment variable configuration
 ** See https://nuxtjs.org/api/configuration-env
 */
export default {
  baseUrl: process.env.BACKEND_BASE_URL || 'http://localhost:3001/api',
  host: process.env.BACKEND_HOST || 'localhost',
  port: process.env.BACKEND_PORT || 3001,
}
