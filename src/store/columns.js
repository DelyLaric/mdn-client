import columns from '@/api/columns'
import { App } from '@/core/vue'

export default {
  namespaced: true,

  state: {
    list: [],
    data: [],

    isLoading: true
  },

  getters: {
    columns (state) {
      return state.list.map(id => state.data[id])
    },

    mapByTable (state, getters) {
      const res = {}
      getters.columns.forEach(column => {
        const table = column.table

        if (res[table]) {
          res[table].push(column)
        } else {
          res[table] = [column]
        }
      })

      return res
    }
  },

  mutations: {
    setDataSource (state, resource) {
      const data = {}
      const list = []

      resource.forEach(item => {
        list.push(item.id)
        data[item.id] = item
      })

      state.list = list
      state.data = data
    },

    addItem (state, item) {
      state.list.push(item.id)
      state.data[item.id] = item
    },

    destroy (state, {id}) {
      App.$delete(state.data, id)
      state.list.splice(state.list.indexOf(id), 1)
    },

    startLoading (state) {
      state.isLoading = true
    },

    finishLoading (state) {
      state.isLoading = false
    },

    updateName (state, {id, name}) {
      state.data[id].name = name
    },

    updateText (state, {id, text}) {
      state.data[id].text = text
    },

    updateComment (state, {id, comment}) {
      state.data[id].comment = comment
    }
  },

  actions: {
    /**
     * todo*
     * 关于状态共享，副作用处理的细节文章
     */
    async search ({getters, commit}) {
      const params = {}
      params.plantId = getters.plantId

      commit('startLoading')
      try {
        commit('setDataSource', await columns.search(params))
      } finally {
        commit('finishLoading')
      }
    },

    async create ({commit}, params) {
      const item = await columns.create(params)
      commit('addItem', item)
    },

    async destroy ({commit}, id) {
      await columns.destroy(id)
      commit('destroy', id)
    },

    async updateName ({commit}, params) {
      await columns.updateName(params)
      commit('updateName', params)
    },

    async updateText ({commit}, params) {
      await columns.updateText(params)
      commit('updateText', params)
    },

    async updateComment ({commit}, params) {
      await columns.updateComment(params)
      commit('updateComment', params)
    }
  }
}
