<template>
  <div class="full-container is-flex-auto">
    <UploadForm v-bind="$props" v-show="currentView === 'form'" />
    <ResultView v-show="currentView === 'result'" />
  </div>
</template>

<script>
import StoreMixin from './store/mixin'

import UploadForm from './form'
import ResultView from './result'

export default {
  name: 'upload',

  mixins: [StoreMixin],

  components: {
    ResultView,
    UploadForm
  },

  props: {
    unique: Array,

    columns: Array,

    handler: Function
  },

  computed: {
    currentView () {
      return this.store.state['currentView']
    }
  }
}
</script>
