<script>
import { mapActions } from 'vuex'

export default {
  render (h) {
    return this.isLoading ?
      h('div', { class: 'loading' }) :
      this.$slots.default[0]
  },

  data () {
    return {
      isLoading: false
    }
  },

  methods: {
    handleLoad,

    ...mapActions({
      getAreas: 'areas/search',
      getPlants: 'plants/search',
      getColumns: 'columns/search'
    })
  },

  created () {
    const apis = [
      this.getAreas,
      this.getPlants,
      this.getColumns
    ]

    this.handleLoad(apis)
  }
}

async function handleLoad (callbacks) {
  this.isLoading = true

  try {
    await Promise.all(callbacks.map(
      async callback => await callback()
    ))
  } finally {
    this.isLoading = false
  }
}
</script>
