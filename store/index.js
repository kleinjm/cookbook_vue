const globalAlert = {
  message: '',
  type: '',
}
const isDarkTheme = false

const state = () => ({ globalAlert, isDarkTheme })

const getters = {
  globalAlert: (state) => {
    return state.globalAlert
  },
  isDarkTheme: (state) => {
    return state.isDarkTheme
  },
}

const mutations = {
  setGlobalAlert(state, { message, type }) {
    state.globalAlert.message = message
    state.globalAlert.type = type
  },
  clearGlobalAlert(state) {
    state.globalAlert = globalAlert
  },
  toggleDarkTheme(state) {
    state.isDarkTheme = !state.isDarkTheme
  },
}

const actions = {
  setGlobalAlert(context, { message, type = 'success' }) {
    context.commit('setGlobalAlert', { message, type })
  },
  clearGlobalAlert(context) {
    context.commit('clearGlobalAlert')
  },
  toggleDarkTheme(context) {
    context.commit('toggleDarkTheme')
  },
}

export default { state, getters, mutations, actions }
