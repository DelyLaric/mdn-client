import Vue from 'vue'

import {
  search,
  update,
  remove,
  // create,
  // updateName,
  // updateText,
  // updateComment,
  // updateColumns
} from '@/api/locations'

export default {
  namespaced: true,

  state: {
    list: [],
    data: {},
    meta: null,

    isLoading: true
  },

  getters: {
    areaId (state, getters, {app}) {
      return app.$route.params.areaId
    },

    params (state, {areaId}) {
      return {
        areaId
      }
    },

    selectedItems ({list, data}) {
      return list.filter(id => data[id]._isSelected).map(id => data[id])
    },

    modifiedItems ({list, data}) {
      return list.filter(
        id => Object.keys(data[id]._isModified).length > 0
      ).map(id => {
        const item = data[id]
        const keys = Object.keys(item._isModified)
        return {
          id,
          fields: keys.map(key => ({
            name: key,
            value: item._isModified[key],
            oldValue: item[key]
          }))
        }
      })
    }
  },

  mutations: {
    setDataSource (state, dataSource) {
      state.meta = dataSource.meta
      const _state = {
        _isModified: {},
        _isSelected: false,
      }

      state.list = []
      dataSource.data.forEach(item => {
        state.list.push(item.id)

        Vue.set(state.data, item.id, Object.assign(item, _state))
      })
    },

    selectItem (state, id) {
      const {list, data} = state

      if (id === true) {
        list.forEach(id => data[id]._isSelected = true)
      } else if (id === false) {
        list.forEach(id => data[id]._isSelected = false)
      } else {
        const _state = data[id]
        _state._isSelected = !_state._isSelected
      }
    },

    updateItemModified (state, {id, column, value}) {
      const item = state.data[id]
      const data = { ...item._isModified }
      if (item[column] === value) {
        return
      }

      data[column] = value

      item._isModified = data
    },

    updateModifiedItems (state, ids) {
      ids.forEach(id => {
        const item = state.data[id]
        for (let key in item._isModified) {
          item[key] = item._isModified[key]
        }

        item._isModified = {}
      })
    },

    deleteItems (state, ids) {
      ids.forEach(id => {
        state.list.splice(state.list.indexOf(id), 1)
        delete state.data[id]
      })
    },

    // addArea (state, area) {
    //   state.list.push(area.id)
    //   state.data[area.id] = area
    // },

    // removeArea (state, id) {
    //   state.list.splice(state.list.indexOf(id), 1)
    //   delete state.data[id]
    // },

    // updateName (state, {id, name}) {
    //   state.data[id].name = name
    // },

    // updateText (state, {id, text}) {
    //   state.data[id].text = text
    // },

    // updateComment (state, {id, comment}) {
    //   state.data[id].comment = comment
    // },

    // updateColumns (state, {id, columns}) {
    //   state.data[id].column_ids = columns
    // },

    startLoading (state) {
      state.isLoading = true
    },

    finishLoading (state) {
      state.isLoading = false
    }
  },

  actions: {
    async search ({getters, commit}, params = {}) {
      // 处理请求页数
      params.format = 'paginate'
      if (!params.page) params.page = 1
      commit('startLoading')
      try {
        commit('setDataSource', await search({
          ...params,
          ...getters.params
        }))
      } finally {
        commit('finishLoading')
      }
    },

    async export ({getters}, params = {}) {
      params.format = 'array'

      return await search({
        ...params,
        ...getters.params
      })
    },

    async updateModifiedItems ({getters, commit}) {
      await update(getters.modifiedItems)

      commit('updateModifiedItems', getters.modifiedItems.map(item => item.id))
    },

    async deleteItems ({getters, commit}) {
      const ids = getters.selectedItems.map(item => item.id)
      await remove(ids)

      commit('deleteItems', ids)
    }

    // async create ({commit}, params) {
    //   commit('addArea', await create(params))
    // },

    // async delete ({commit}, id) {
    //   await remove(id)
    //   commit('removeArea', id)
    // },

    // async updateName ({commit}, {id, name}) {
    //   await updateName(id, name)
    //   commit('updateName', {id, name})
    // },

    // async updateText ({commit}, {id, text}) {
    //   await updateText(id, text)
    //   commit('updateText', {id, text})
    // },

    // async updateComment ({commit}, {id, comment}) {
    //   await updateComment(id, comment)
    //   commit('updateComment', {id, comment})
    // },

    // async updateColumns ({commit}, {id, columns}) {
    //   await updateColumns(id, columns)
    //   commit('updateColumns', {id, columns})
    // }
  }
}
