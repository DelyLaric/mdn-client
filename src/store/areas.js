import {
  search,
  remove,
  create,
  updateName,
  updateText,
  updateComment,
  updateColumns
} from '@/api/areas'

export default {
  namespaced: true,

  state: {
    list: [],
    data: {},

    isLoading: true
  },

  getters: {
    mapByPlantId: state => state.list.reduce(
      (res, areaId) => {
        const id = state.data[areaId]

        if (res[id]) res[id].push(areaId)
        else res[id] = [areaId]

        return res
      }, {}
    )
  },

  mutations: {
    setAreas (state, areas) {
      // 无法直接向对象添加响应式属性
      const data = {}

      state.list = []
      areas.forEach(area => {
        state.list.push(area.id)
        data[area.id] = area
      })

      state.data = data
    },

    addArea (state, area) {
      state.list.push(area.id)
      state.data[area.id] = area
    },

    removeArea (state, id) {
      state.list.splice(state.list.indexOf(id), 1)
      delete state.data[id]
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
        commit('setAreas', await search())
      } finally {
        commit('finishLoading')
      }
    },

    async create ({commit}, params) {
      commit('addArea', await create(params))
    },

    async delete ({commit}, id) {
      await remove(id)
      commit('removeArea', id)
    },

    async updateName ({commit}, {id, name}) {
      await updateName(id, name)
      commit('updateName', {id, name})
    },

    async updateText ({commit}, {id, text}) {
      await updateText(id, text)
      commit('updateText', {id, text})
    },

    async updateComment ({commit}, {id, comment}) {
      await updateComment(id, comment)
      commit('updateComment', {id, comment})
    },

    async updateColumns ({commit}, {id, columns}) {
      await updateColumns(id, columns)
      commit('updateColumns', {id, columns})
    }
  }
}
