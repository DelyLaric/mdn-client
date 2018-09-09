<template>
  <DestroyDialog
    :handler="handleConfirm"
    @close="handleClose">
    <div>
      流程属性
      <span class="tag is-medium">
        {{column.name}}
      </span>
      将无法恢复
    </div>
  </DestroyDialog>
</template>

<script>
import { mapActions } from 'vuex'
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  name: 'SystemTableColumnDestroy',

  components: {
    DestroyDialog
  },

  props: {
    table: String,
    column: Object
  },

  methods: {
    ...mapActions({
      search: 'plants/search',
      destroy: 'columns/destroy'
    }),

    handleClose () {
      this.$router.push({
        name: 'system table column manage',
        params: this.$route.params
      })
    },

    handleConfirm () {
      const params = {id: this.column.id}
      if (this.table === 'locations') {
        params.pivot = 'areas',
        params.pivotKey = 'columns'
      }
      return this.destroy(params)
        .then(() => {
          if (this.table === 'locations') {
            this.$store.dispatch('areas/search')
          }
        })
        .then(() => this.$router.push({
          name: 'system table columns',
          params: this.$route.params
        }))
    }
  }
}
</script>
