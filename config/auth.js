/*
 ** Auth module configuration
 ** See https://auth.nuxtjs.org
 */
export default {
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
  redirect: {
    login: '/recipes',
  },
}
