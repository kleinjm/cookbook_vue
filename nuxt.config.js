import path from 'path'
import colors from 'vuetify/es5/util/colors'
import auth from './config/auth'
import axios from './config/axios'
import env from './config/env'
import head from './config/head'

const projectSrc = path.join(__dirname, 'src')

export default {
  mode: 'universal',
  env,
  head,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
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
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3,
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['~mixins'] = path.join(projectSrc, 'mixins')
      config.resolve.alias['~utils'] = path.join(projectSrc, 'utils')
    },
  },
  auth,
  router: {
    middleware: ['auth'],
  },
}
