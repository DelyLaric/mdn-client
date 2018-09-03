import { App } from '@/core/vue'
import projects from '@/api/projects'

export default {
  namespaced: true,

  state: {
    list: [],
    data: {},
    query: '',

    isLoading: true

  },

  getters: {
    plantId () {
      return App.$route.params.plantId
    }
  },

  mutations: {
    setDataSource (state, resource) {
      const data = {}

      state.list = []
      resource.forEach(item => {
        state.list.push(item.id)
        data[item.id] = item
      })
  
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

    updateName (state, {id, name}) {
      state.data[id].name = name
    },

    updateText (state, {id, text}) {
      state.data[id].text = text
    },

    updateComment (state, {id, comment}) {
      state.data[id].comment = comment
    },
  
    file (state, {id, date}) {
      state.data[id].filed_at = date
    },

    reopen (state, {id}) {
      state.data[id].filed_at = null
    },

    setQuery (state, text) {
      state.query = text
    },

    startLoading (state) {
      state.isLoading = true
    },
  
    finishLoading (state) {
      state.isLoading = false
    }
  },

  actions: {
    async getDataSource ({getters, commit}) {
      const params = {}
      params.plantId = getters.plantId

      commit('startLoading')
      try {
        commit('setDataSource', await projects.search(params))
      } finally {
        commit('finishLoading')
      }
    },

    async create ({commit}, params) {
      const item = await projects.create(params)
      commit('addItem', item)
    },

    async destroy ({commit}, params) {
      await projects.destroy(params)
      commit('destroy', params)
    },

    async file ({commit}, {id}) {
      commit('file', {
        id, date: await projects.file({id})
      })
    },

    async reopen ({commit}, params) {
      await projects.reopen(params)
      commit('reopen', params)
    },

    async updateName ({commit}, params) {
      await projects.updateName(params)
      commit('updateName', params)
    },

    async updateText ({commit}, params) {
      await projects.updateText(params)
      commit('updateText', params)
    },

    async updateComment ({commit}, params) {
      await projects.updateComment(params)
      commit('updateComment', params)
    }
  }
}
