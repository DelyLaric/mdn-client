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
  name: 'AreaColumnDestroy',

  components: {
    DestroyDialog
  },

  props: {
    table: String,
    column: Object
  },

  methods: {
    ...mapActions({
      search: 'areas/search',
      destroy: 'columns/destroy'
    }),

    handleClose () {
      this.$router.push({
        name: 'area column manage',
        params: { columnId: this.column.id }
      })
    },

    handleConfirm () {
      return this.destroy({
        id: this.column.id,
        pivot: 'areas',
        pivotKey: 'columns'
      })
      .then(() => this.search()) // 暂时通过刷新来提交数据层变化
      .then(() => this.$router.push({name: 'area columns'}))
    }
  }
}
</script>
