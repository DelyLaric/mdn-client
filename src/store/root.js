export default {
  state: {
    isWaiting: false,
    isLoading: [],

    app: {}
  },

  getters: {
    isLoading (state) {
      return state.isLoading.length > 0
    }
  },

  mutations: {
    setWaiting (state) {
      state.isWaiting = true
    },

    unsetWaiting (state) {
      state.isWaiting = false
    },

    setLoading (state) {
      state.isLoading.push(true)
    },

    unsetLoading (state) {
      state.isLoading.pop()
    }
  },

  actions: {
    async wait ({commit}, callback) {
      commit('setWaiting')

      try {
        await callback()
      } finally {
        commit('unsetWaiting')
      }
    },

    async load ({commit}, callback) {
      commit('setLoading')

      try {
        await callback ()
      } finally {
        commit('unsetLoading')
      }
    }
  }
}