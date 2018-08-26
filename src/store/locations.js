import Vue from 'vue'

import {
  search,
  update,
  remove,
  create
} from '@/api/locations'

const itemState = {
  _isModified: {},
  _isSelected: false,
}

export default {
  namespaced: true,

  state: {
    list: [],
    data: {},
    meta: null,

    query: undefined,

    isLoading: true
  },

  getters: {
    areaId (state, getters, {app}) {
      return app.$route.params.areaId
    },

    params ({query}, {areaId}) {
      return {
        query,
        areaId,
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
      const data = {}
      state.meta = dataSource.meta

      state.list = []
      dataSource.data.forEach(item => {
        state.list.push(item.id)

        data[item.id] = Object.assign(item, itemState)
      })

      state.data = data
    },

    setQuery (state, value) {
      value = value.trim()
      state.query = value === '' ? undefined : value
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

    modifyItem (state, {id, column, value}) {
      const item = state.data[id]
      const data = { ...item._isModified }

      if (value === '' && item[column] === null) {
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

    addNewItem (state, item) {
      state.list.unshift(item.id)
      Object.assign(item, itemState)
      Vue.set(state.data, item.id, item)
    },

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

    async createItem ({getters, commit}) {
      const item = await create(getters.areaId)
      commit('addNewItem', item)

      return item.id
    },

    async updateModifiedItems ({getters, commit}) {
      if (getters.modifiedItems.length === 0) return

      await update(getters.modifiedItems)

      commit('updateModifiedItems', getters.modifiedItems.map(item => item.id))
    },

    async deleteItems ({getters, dispatch}) {
      if (getters.selectedItems.length === 0) return

      const ids = getters.selectedItems.map(item => item.id)
      await remove(ids)
      dispatch('search')
    }
  }
}
