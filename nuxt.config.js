import path from 'path'
import colors from 'vuetify/es5/util/colors'
import { port, host, baseURL } from './.env.development'

const projectSrc = path.join(__dirname, 'src')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },
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
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: { host, port, baseURL },
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
      config.resolve.alias['~utils'] = path.join(projectSrc, 'utils')
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/users/sign_in',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/users/sign_out', method: 'delete' },
          user: { url: '/users/current', propertyName: 'user' },
        },
      },
    },
  },
  router: {
    middleware: ['auth'],
  },
}
