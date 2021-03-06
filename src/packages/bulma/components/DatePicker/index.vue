<template>
  <component
    :value="value"
    :is="wrapperComponent"
  />
</template>

<script>
import BasicInput from './BasicInput'
import Input from './input'
import Td from './td'
import Flatpickr from 'flatpickr'
import zh from 'flatpickr/dist/l10n/zh.js'

export default {
  mixins: [BasicInput],

  props: {
    wrapper: {
      type: String,
      default: 'input'
    },
    config: {
      default: () => ({})
    },
    locale: {
      type: String,
      default: 'zh'
    }
  },

  data () {
    return {
      datepicker: null,
      selectedDates: null
    }
  },

  computed: {
    wrap () {
      return !!this.config.wrap
    },
    static () {
      return !!this.config.static
    },
    name () {
      return this.wrap ? 'wrapperInput' : 'singleInput'
    },

    wrapperComponent () {
      switch (this.wrapper) {
        case 'input': return Input
        case 'td': return Td
      }
    }
  },

  mounted () {
    if (!this.datepicker) {
      this.config.onValueUpdate = this.dateUpdated
      if (this.locale === 'zh') {
        this.config.locale = zh.zh
      }
      this.datepicker = new Flatpickr(this.$el, this.config)
      this.datepicker.setDate(this.value)
    }
    this.$watch('config', this.redraw)
    this.$watch('value', (value) => this.datepicker.setDate(value))
  },

  beforeDestroy () {
    if (this.datepicker && !this.static) {
      this.datepicker.destroy()
      this.datepicker = null
    }
  },

  methods: {
    redraw (newConfig) {
      this.datepicker.config = Object.assign(this.datepicker.config, newConfig)
      this.datepicker.redraw()
      this.datepicker.jumpToDate()
    },

    dateUpdated (selectedDates, dateStr) {
      this.$emit('change', dateStr)
    }
  }
}
</script>

<style lang="stylus">
$calendar_background = #ffffff
$calendar_border_color = #d3d6db

$months_color = #111
$months_background = transparent

$weekdays_background = transparent

$day_text_color = #222324
$day_hover_background_color = #d3d6db

$today_color = #ed6c63
$selected_day_background = #1fc8db

@import '~flatpickr/src/style/flatpickr'

.flatpickr-calendar.hasWeeks
  width: auto !important
</style>
