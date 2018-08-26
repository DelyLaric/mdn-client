<script>
import store from './store'
import { getNamespacedStore } from '@/core/vuex'

export default {
  props: {
    namespace: {
      type: String,
      default () {
        return `${this.$vnode.tag}/${this._uid}`
      }
    }
  },

  data () {
    this.$store.registerModule(this.namespace, store)

    return {
      store: getNamespacedStore(this.namespace)
    }
  },

  provide () {
    return {
      store: this.store
    }
  },

  beforeDestroy () {
    this.$store.unregisterModule(this.namespace)
  }
}
</script>
