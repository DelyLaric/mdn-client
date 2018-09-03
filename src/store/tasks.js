import { App } from '@/core/vue'
import tasks from '@/api/tasks'

export default {
  namespaced: true,

  state: {
    list: [],
    data: {},

    projectId: null,

    isLoading: true

  },

  getters: {
    projectId () {
      return App.$route.params.projectId
    },

    params (state, getters) {
      return {
        projectId: getters.projectId
      }
    }
  },

  mutations: {
    setDataSource (state, dataSource) {
      const data = {}
      state.list = []

      dataSource.forEach(item => {
        state.list.push(item.id)
        data[item.id] = item
      })

      state.data = data
    },

    reset (state) {
      state.list = []
      state.data = {}
    },

    addItem (state, item) {
      state.list.splice(0, 1, item.id)
      App.$set(state.data, item.id, item)
    },

    destroyItem (state, id) {
      App.$delete(state.data, id)
      state.list.splice(state.list.indexOf(id), 1)
    },

    updateComment (state, {id, value}) {
      state.data[id].comment = value
    },

    startLoading (state) {
      state.isLoading = true
    },

    finishLoading (state) {
      state.isLoading = false
    }

  },

  actions: {
    async search ({getters, commit}) {
      const params = {}
      commit('startLoading')
      try {
        commit('setDataSource', await tasks.search({
          ...params,
          ...getters.params
        }))
      } finally {
        commit('finishLoading')
      }
    },

    async destroy ({commit}, params) {
      await tasks.destroy(params)
      commit('destroyItem', params.id)
    },

    async create({commit}, params) {
      const item = await tasks.create(params)
      commit('addItem', item)

      return item.id
    },

    async updateComment ({commit}, params) {
      await tasks.updateComment(params)
      commit('updateComment', params)
    }

  }
}
