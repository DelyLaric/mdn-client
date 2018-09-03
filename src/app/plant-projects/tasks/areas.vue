<template>
  <table class="table is-bordered is-fullwidth is-nowrapped">
    <thead>
      <th style="width: 1px">#</th>
      <th v-for="area in areas">
        {{area.text}}
      </th>
    </thead>
    <tbody>
      <tr v-for="(id, index) in parent.list">
        <td>{{index}}</td>
        <td v-for="area in areas">

        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'TaskAreas',

  data () {
    return {

    }
  },

  computed: {
    ...mapState({
      data: state => state.areas.data
    }),

    ...mapGetters({
      areasId: 'areas/mapIdByPlantId'
    }),

    parent () {
      return this.$parent
    },

    areas () {
      return this.areasId[this.plantId].map(id => this.data[id])
    },

    plantId () {
      return this.$route.params.plantId
    }
  }
}
</script>
