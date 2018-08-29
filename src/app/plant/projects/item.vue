<template>
  <a class="panel-block is-active" style="display: flex">
    <div style="width: 132px; overflow: hidden">
      <div>
        <p v-html="matchedText(project.name)" />
      </div>
      <div>
        <p v-html="matchedText(project.text)" />
      </div>
      <div>
        <p v-html="matchedText(project.comment)" />
      </div>
    </div>
    <span v-if="project.filed_at" class="tag is-primary is-right">
      已归档
    </span>
    <span v-else class="tag is-success is-right">
      进行中
    </span>
    <a @click="handleClickSetting" class="is-clickable is-right">
      <span class="icon">
        <i class="iconfont icon-gear" />
      </span>
    </a>
  </a>
</template>

<script>
export default {
  props: {
    project: {}
  },

  methods: {
    handleClickSetting () {
      this.$router.push({
        name: 'project manage',
        params: {
          projectId: this.project.id,
          plantId: this.$route.params.plantId
        }
      })
    },

    matchedText (value) {
      if (
        this.$parent.query === '' ||
        this.$parent.isQueryFocus === false
      ) {
        return value
      }

      return typeof value === 'string' ? value.replace(
        this.$parent.query,
        `<strong class="has-background-warning">${this.$parent.query}</strong>`
      ) : value
    }
  }
}
</script>

<style lang="sass" scoped>
.iconfont
  font-size: 1.25rem
  &:hover
    font-size: 1.5rem
</style>
