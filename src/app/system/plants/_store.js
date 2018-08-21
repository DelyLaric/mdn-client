export default {
  namespaced: true,

  state: {
    plants: [],

    pointer: 0
  },

  getters: {
    selectedPlant (state) {
      return state.plants[state.pointer]
    }
  },

  mutations: {
    setPlants (state, plants) {
      state.plants = plants
    },

    addPlant (state, plant) {
      state.plants.push(plant)
    },

    removePlant (state) {
      state.plants.splice(state.pointer, 1)
    },

    selectPlant (state, key) {
      state.pointer = key
    }
  }
}
