import {
  search,
  remove,
  create,
  updateName,
  updateComment
} from '@/api/plants'

export default {
  namespaced: true,

  state: {
    list: [],
    data: [],
    plants: [],

    pointer: 0,
    isLoading: true
  },

  getters: {
    plant: state => state.plants[state.pointer],

    plants: state => state.plants
  },

  mutations: {
    setPlants (state, plants) {
      state.plants = plants

      const data = {}

      state.list = []
      plants.forEach(plant => {
        state.list.push(plant.id)
        data[plant.id] = plant
      })

      state.data = data
    },

    addPlant (state, plant) {
      state.plants.push(plant)
    },

    removePlant (state) {
      state.plants.splice(state.pointer, 1)
    },

    selectPlant (state, key) {
      state.pointer = key
    },

    updateName (state, value) {
      state.plants[state.pointer].name = value
    },

    updateComment (state, value) {
      state.plants[state.pointer].comment = value
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
        commit('setPlants', await search())
      } finally {
        commit('finishLoading')
      }
    },

    async delete ({commit, getters}) {
      await remove(getters.plant.name)
      commit('removePlant')
    },

    async create ({commit}, params) {
      commit('addPlant', await create(params))
    },

    async updateName ({commit, getters}, value) {
      await updateName(getters.plant, value)

      commit('updateName', value)
    },

    async updateComment ({commit, getters}, value) {
      await updateComment(getters.plant, value)

      commit('updateComment', value)
    }
  }
}
