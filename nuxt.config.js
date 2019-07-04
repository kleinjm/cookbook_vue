import auth from './config/auth'
import axios from './config/axios'
import env from './config/env'
import head from './config/head'
import css from './config/css'
import router from './config/router'
import build from './config/build'
import vuetify from './config/vuetify'

export default {
  mode: 'universal',
  env,
  head,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  css,
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/Vuelidate' }],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios', // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
  ],
  axios,
  vuetify,
  build,
  auth,
  router,
}
