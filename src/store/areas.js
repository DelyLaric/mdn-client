import areas from '@/api/areas'
import { App } from '@/core/vue'

export default {
  namespaced: true,

  state: {
    list: [],
    data: [],

    isLoading: true
  },

  getters: {
    mapByPlantId (state, getters, rootState) {
      const res = {}
      rootState.plants.list.forEach(id => res[id] = [])

      state.list.forEach(id => {
        const plantId = state.data[id].plant_id
        res[plantId] && res[plantId].push(state.data[id])
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
      App.$set(state.data, item.id, item)
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
    },

    updateColumns (state, {id, columns}) {
      state.data[id].column_ids = columns
    }
  },

  actions: {
    /**
     * todo*
     * 关于状态共享，副作用处理的细节文章
     */
    async search ({commit}) {
      commit('startLoading')
      try {
        commit('setDataSource', await areas.search())
      } finally {
        commit('finishLoading')
      }
    },

    async create ({commit}, params) {
      const item = await areas.create(params)
      commit('addItem', item)
    },

    async destroy ({commit}, id) {
      await areas.destroy(id)
      commit('destroy', id)
    },

    async updateName ({commit}, params) {
      await areas.updateName(params)
      commit('updateName', params)
    },

    async updateText ({commit}, params) {
      await areas.updateText(params)
      commit('updateText', params)
    },

    async updateComment ({commit}, params) {
      await areas.updateComment(params)
      commit('updateComment', params)
    },

    async updateColumns ({commit}, params) {
      await areas.updateColumns(params)
      commit('updateColumns', params)
    }
  }
}
