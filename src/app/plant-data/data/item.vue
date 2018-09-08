<template>
  <tr :class="{'is-selected': item._isSelected}">
    <td
      style="cursor: pointer"
      @click="selectItem(item.id)">
      <Checkbox :value="item._isSelected"/>
    </td>
    <EditableCell
      v-for="column in this.$parent.tableColumns"
      :key="column.name"
      :value="item[column.name]"
      :highlight="queryText"
      @change="modifyItem({
        id: item.id,
        column: column.name,
        value: $event
      })"
      ref="cells"
    />
  </tr>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import EditableCell from '@/components/common/editable-cell'

export default {
  components: {
    EditableCell
  },

  props: {
    item: Object
  },

  computed: mapState({
    queryText: state => state.data.query
  }),

  methods: {
    ...mapMutations('data', [
      'selectItem',
      'modifyItem'
    ])
  }
}
</script>
