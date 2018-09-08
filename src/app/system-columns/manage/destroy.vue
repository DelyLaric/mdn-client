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
import get from 'lodash/get'
import { mapActions } from 'vuex'
import DestroyDialog from '@/components/common/destroy-dialog'

export default {
  name: 'SystemTableColumnDestroy',

  components: {
    DestroyDialog
  },

  props: {
    table: String,
    column: Object,
    schema: Object,
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
      const pivot = this.schema.pivot
      return this.destroy({
        id: this.column.id,
        pivot: get(this.schema, 'pivot.table'),
        pivotKey: get(this.schema, 'pivot.key')
      })
      .then(() => {
        const callback = get(this.schema, 'pivot.callback')
        if (callback) callback(this)
      })
      .then(() => this.$router.push({
        name: 'system table columns',
        params: this.$route.params
      }))
    }
  }
}
</script>
