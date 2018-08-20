<script>
import MenuItem from './item'

export default {
  props: {
    menus: {
      type: Array,
      default: () => ([])
    }
  },

  render (h) {
    return h(
      'div',
      { class: 'menu-list' },
      this.menus.map(menu => h(
        MenuItem, { props: menu }
      ))
    )
  }
}
</script>
