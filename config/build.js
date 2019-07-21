import path from 'path'
const projectSrc = path.join(__dirname, 'src')

/*
 ** Build configuration
 */
export default {
  /*
   ** You can extend webpack config here
   */
  extend(config, ctx) {
    config.resolve.alias['~mixins'] = path.join(projectSrc, 'mixins')
    config.resolve.alias['~mutations'] = path.join(projectSrc, 'mutations')
    config.resolve.alias['~queries'] = path.join(projectSrc, 'queries')
    config.resolve.alias['~utils'] = path.join(projectSrc, 'utils')
  },
}
