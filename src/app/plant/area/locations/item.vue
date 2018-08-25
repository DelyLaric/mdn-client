<template>
  <tr>
    <td
      style="cursor: pointer"
      @click="selectItem(location.id)">
      <Checkbox :value="location._isSelected"/>
    </td>
    <td>{{location.id}}</td>
    <TableCell
      v-for="column in [{name: 'location_id'}, ...columns]"
      :key="column.name"
      :value="location[column.name]"
      :isChanged="
        location._isModified[column.name] !== undefined &&
        location._isModified[column.name] !== location[column.name]
      "
      @change="updateItemModified({
        id: location.id,
        column: column.name,
        value: $event
      })"
    />
  </tr>
</template>

<script>
import { mapMutations } from 'vuex'

import TableCell from './cell'

export default {
  components: {
    TableCell
  },

  props: {
    columns: Array,
    location: Object
  },

  methods: {
    ...mapMutations('locations', [
      'selectItem',
      'updateItemModified'
    ])
  }
}
</script>
