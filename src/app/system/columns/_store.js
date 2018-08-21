export default {
  namespaced: true,

  state: {
    columns: [],

    pointer: 0
  },

  getters: {
    selectedColumn (state) {
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
    }
  }
}
