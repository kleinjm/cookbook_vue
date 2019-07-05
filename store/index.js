const globalAlert = {
  message: '',
  type: '',
}

const state = () => ({ globalAlert })

const getters = {
  globalAlert: (state) => {
    return state.globalAlert
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
}

const actions = {
  setGlobalAlert(context, { message, type = 'success' }) {
    context.commit('setGlobalAlert', { message, type })
  },
  clearGlobalAlert(context) {
    context.commit('clearGlobalAlert')
  },
}

export default { state, getters, mutations, actions }
