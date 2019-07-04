const state = {
  globalAlert: '',
}

const getters = {
  globalAlert: (state) => {
    return state.globalAlert
  },
}

const mutations = {
  setGlobalAlert(state, message) {
    state.globalAlert = message
  },
  clearGlobalAlert(state) {
    state.globalAlert = ''
  },
}

const actions = {
  setGlobalAlert(context, message) {
    context.commit('setGlobalAlert', message)
  },
  clearGlobalAlert(context) {
    context.commit('clearGlobalAlert')
  },
}

export default { state, getters, mutations, actions }
