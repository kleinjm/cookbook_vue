/*
 ** Environment variable configuration
 ** See https://nuxtjs.org/api/configuration-env
 */
export default {
  baseUrl: process.env.BASE_URL || 'http://localhost:3001/api',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001,
}
