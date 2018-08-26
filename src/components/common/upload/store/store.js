import { matchStringInArray } from '@/utils/string'

export default {
  namespaced: true,

  state () {
    return {
      'currentView': 'form',

      'columns': [{
        key: String,
        index: Number,
        title: String,
        header: String
      }],

      'headers': [],

      'data.excel': [],

      'data.upload': [],
      'data.ignored': [],

      'data.success': [],
      'data.error': [],

      'field.matcher': []
    }
  },

  getters: {
    matchedColumns (state) {
      return state.columns.filter(column => column.index !== -1)
    }
  },

  mutations: {
    setColumns (state, columns) {
      state.columns = columns.map(column => ({
        index: -1,
        name: column.name,
        text: column.text
      }))
    },

    setHeaders (state, headers) {
      state.headers = [...headers]
      state.columns.forEach(column => {
        column.index = matchStringInArray(headers, column.text)
        if (column.index !== -1) { headers[column.index] = null }
      })
    },

    openFormView (state) {
      state['currentView'] = 'form'
    },

    openResultView (state) {
      state['currentView'] = 'result'
    },

    setExcelData (state, data) {
      state['data.excel'] = data.filter(item => {
        return !item.every(cell => cell === '')
      })
    },

    setIgnoredData (state, data) {
      state['data.ignored'] = data
    },

    setResultData (state, data) {
      state['data.result'] = data
    },

    setSuccessData (state, data) {
      state['data.success'] = data
    },

    setErrorData (state, data) {
      state['data.error'] = data
    },

    mergeErrorData (state, data) {
      state['data.error'].push(...data)
    },

    selectView (state, view) {
      state['currentView'] = view
    }
  }
}
