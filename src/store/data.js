import { App } from '@/core/vue'
import data from '@/api/data'

const itemState = {
  _isModified: {},
  _isSelected: false,
}

export default {
  namespaced: true,

  state: {
    schema: {},
    list: [],
    data: {},
    meta: null,

    query: '',

    params: {
      table: null,
      primary: null,
      group: null,
      groupId: null
    },

    isLoading: true
  },

  getters: {
    params (state) {
      return {
        ...state.params,
        query: state.query === '' ? undefined : state.query
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
    addSchema (state, schema) {
      state[schema.namespace] = schema
    },

    setParams (state, params) {
      state.params = params
    },

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

    setQuery (state, value = '') {
      value = value.trim()
      state.query = value
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

    saveItems (state, ids) {
      ids.forEach(id => {
        const item = state.data[id]
        for (let key in item._isModified) {
          item[key] = item._isModified[key]
        }

        item._isModified = {}
      })
    },

    destroy (state, ids) {
      ids.forEach(id => {
        state.list.splice(state.list.indexOf(id), 1)
        App.$delete(state.data, id)
      })
    },

    addItem (state, item) {
      state.list.unshift(item.id)
      Object.assign(item, itemState)
      App.$set(state.data, item.id, item)
    },

    startLoading (state) {
      state.isLoading = true
    },

    finishLoading (state) {
      state.isLoading = false
    }
  },

  actions: {
    async load ({commit}, callback) {
      commit('startLoading')
      try {
        await callback()
      } finally {
        commit('finishLoading')
      }
    },

    async search ({getters, commit}, params = {}) {
      // 处理请求页数
      params.format = 'paginate'
      if (!params.page) params.page = 1
      commit('startLoading')
      try {
        commit('setDataSource', await data.search({
          ...params,
          ...getters.params
        }))
      } finally {
        commit('finishLoading')
      }
    },

    async export ({getters}, params = {}) {
      params.format = 'array'

      return await data.search({
        ...params,
        ...getters.params
      })
    },

    async create ({commit}, params) {
      const item = await data.create(params)
      commit('addItem', item)

      return item.id
    },

    async saveItems ({getters, commit}, params) {
      params.items = getters.modifiedItems
      if (params.items.length === 0) return

      await data.update(params)
      commit('saveItems', params.items.map(item => item.id))
    },

    async destroy ({getters, commit}, params) {
      const items = getters.selectedItems
      if (items.length === 0) return

      params.ids = items.map(item => item.id)
      await data.destroy(params)
      commit('destroy', params.ids)
    }
  }
}
