import {
  search,
  remove,
  create,
  updateName,
  updateText,
  updateComment
} from '@/api/area-columns'

export default {
  namespaced: true,

  state: {
    columns: [],

    pointer: 0,
    isLoading: true
  },

  getters: {
    column (state) {
      return state.columns[state.pointer]
    }
  },

  mutations: {
    setColumns (state, columns) {
      state.columns = columns
    },

    addColumn (state, column) {
      state.columns.push(column)
    },

    removeColumn (state) {
      state.columns.splice(state.pointer, 1)
    },

    selectColumn (state, key) {
      state.pointer = key
    },

    updateName (state, value) {
      state.columns[state.pointer].name = value
    },

    updateText (state, value) {
      state.columns[state.pointer].text = value
    },

    updateComment (state, value) {
      state.columns[state.pointer].comment = value
    },

    startLoading (state) {
      state.isLoading = true
    },

    finishLoading (state) {
      state.isLoading = false
    }
  },

  actions: {
    async search ({commit}) {
      commit('startLoading')
      try {
        commit('setColumns', await search())
      } finally {
        commit('finishLoading')
      }
    },

    async delete ({commit, getters}) {
      await remove(getters.column.name)
      commit('removeColumn')
    },

    async create ({commit}, params) {
      commit('addColumn', await create(params))
    },

    async updateName ({commit, getters}, name) {
      await updateName(getters.column.name, name)
      commit('updateName', name)
    },

    async updateText ({commit, getters}, name) {
      await updateText(getters.column.name, name)
      commit('updateText', name)
    },

    async updateComment ({commit, getters}, name) {
      await updateComment(getters.column.name, name)
      commit('updateComment', name)
    }
  }
}
