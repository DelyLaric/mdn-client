import { App } from '@/core/vue'

export const baseMutations = {
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

  destroy (state, id) {
    App.$delete(state.data, id)
    state.list.splice(state.list.indexOf(id), 1)
  },

  startLoading (state) {
    state.isLoading = true
  },

  finishLoading (state) {
    state.isLoading = false
  }
}

export const updateNameTextCommentMutations = {
  updateName (state, {id, name}) {
    state.data[id].name = name
  },

  updateText (state, {id, text}) {
    state.data[id].text = text
  },

  updateComment (state, {id, comment}) {
    state.data[id].comment = comment
  }
}

export const getBaseActions = resource => ({
  async search ({getters, commit}) {
    const params = {}
    params.plantId = getters.plantId

    commit('startLoading')
    try {
      commit('setDataSource', await resource.search(params))
    } finally {
      commit('finishLoading')
    }
  },

  async create ({commit}, params) {
    const item = await resource.create(params)
    commit('addItem', item)
  },

  async destroy ({commit}, id) {
    await resource.destroy(id)
    commit('destroy', id)
  }
})

export const getUpdateNameTextCommentActions = resource => ({
  async updateName ({commit}, params) {
    await resource.updateName(params)
    commit('updateName', params)
  },

  async updateText ({commit}, params) {
    await resource.updateText(params)
    commit('updateText', params)
  },

  async updateComment ({commit}, params) {
    await resource.updateComment(params)
    commit('updateComment', params)
  }
})
