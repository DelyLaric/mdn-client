<template>
  <div class="tabs">
    <ul>
      <li
        v-for="tab in tabs" :key="tab.text"
        :class="{'is-active': $router.hasMatched(tab.route)}"
        @click="$router.push(tab.route)">
        <a v-text="tab.text" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array
  }
}
</script>
