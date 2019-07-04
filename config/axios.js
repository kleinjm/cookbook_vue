import env from './env' // env is not loaded yet so require it explicitly

/*
 ** Axios module configuration
 ** See https://axios.nuxtjs.org/options
 */
export default {
  baseURL: env.baseUrl,
  host: env.host,
  port: env.port,
}
