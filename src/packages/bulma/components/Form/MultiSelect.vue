<template>
  <div
    class="table-container is-unselectable"
    :style="{
      'max-height': height,
      'overflow': 'auto'
    }">
    <table class="table is-hoverable is-centered is-narrow is-bordered is-fullwidth">
      <thead>
        <th>&nbsp;</th>
        <th>{{text}}</th>
      </thead>
      <tbody>
        <tr
          v-for="option in options" :key="option.text"
          :class="{'is-hovered': value.indexOf(option.value) !== -1}"
          style="cursor: pointer;"
          @click="check(option)">
          <td style="width: 1px">
            <Checkbox
              :disabled="option.disabled"
              :value="value.indexOf(option.value) !== -1"
            />
          </td>
          <td>
            {{option.text}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: Array,

    text: [String, Array],

    options: Array,

    height: {
      type: String,
      default: 'auto'
    }
  },

  methods: {
    check (option) {
      if (option.disabled) return

      let value= option.value
      let data = [...this.value]
      let key = this.value.indexOf(value)

      if (key === -1) data.push(value)
      else data.splice(key, 1)

      this.$emit('change', data)
    }
  }
}
</script>
