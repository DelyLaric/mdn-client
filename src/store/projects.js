import Vue from 'vue'

import {
  search,
  create,
  file,
  reopen,
  destroy,
  updateName,
  updateText,
  updateComment
} from '@/api/projects'

export default {
  namespaced: true,

  state: {
    list: [],
    data: {},
    query: '',

    isLoading: true

  },

  getters: {
    plantId (state, getters, {app}) {
      return app.$route.params.plantId
    },

    projectId (state, getters, {app}) {
      return app.$route.params.projectId
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

    addItem (state, item) {
      state.list.unshift(item.id)

      Vue.set(state.data, item.id, item)
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

    reopen (state, id) {
      state.data[id].filed_at = null
    },

    destroy (state, id) {
      Vue.delete(state.data, id)
      state.list.splice(state.list.indexOf(id), 1)
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
        commit('setDataSource', await search(params))
      } finally {
        commit('finishLoading')
      }
    },

    async create ({commit}, params) {
      const item = await create(params)
      commit('addItem', item)
    },

    async updateName ({commit}, params) {
      await updateName(params)
      commit('updateName', params)
    },

    async updateText ({commit}, params) {
      await updateText(params)
      commit('updateText', params)
    },

    async updateComment ({commit}, params) {
      await updateComment(params)
      commit('updateComment', params)
    },

    async file ({commit}, id) {
      commit('file', { id, date: await file(id) })
    },

    async reopen ({commit}, id) {
      await reopen(id)
      commit('reopen', id)
    },

    async destroy ({commit}, id) {
      await destroy(id)
      commit('destroy', id)
    }

  }
}
