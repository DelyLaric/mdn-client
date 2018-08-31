<template>
  <tr :class="{'is-selected': location._isSelected}">
    <td
      style="cursor: pointer"
      @click="selectItem(location.id)">
      <Checkbox :value="location._isSelected"/>
    </td>
    <EditableCell
      v-for="column in this.$parent.tableColumns"
      :key="column.name"
      :value="location[column.name]"
      :highlight="queryText"
      :isChanged="
        location._isModified[column.name] !== undefined &&
        location._isModified[column.name] !== location[column.name]
      "
      @change="modifyItem({
        id: location.id,
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
    location: Object
  },

  computed: mapState({
    queryText: state => state.locations.query
  }),

  methods: {
    ...mapMutations('locations', [
      'selectItem',
      'modifyItem'
    ])
  }
}
</script>
