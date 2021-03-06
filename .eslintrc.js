module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'prettier',
    'prettier/vue',
  ],
  plugins: [
    'prettier',
    'vue'
  ],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'vue/attribute-hyphenation': 0,
  },
}
