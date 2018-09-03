<template>
  <a
    @click="handleClick"
    style="display: flex"
    :class="{
      'panel-block': true,
      'is-active': $route.params.projectId === project.id
    }">
    <div style="width: 100px; overflow: hidden;">
      <div>
        <p style="white-space: nowrap" v-html="matchedText(project.name)" />
      </div>
      <div>
        <p style="white-space: nowrap" v-html="matchedText(project.text)" />
      </div>
      <div>
        <p style="white-space: nowrap" v-html="matchedText(project.comment)" />
      </div>
    </div>
    <div class="is-right is-flex" style="items-align: center; height: 1.5rem">
      <span v-if="project.filed_at" class="tag is-primary">
        已归档
      </span>
      <span v-else class="tag is-success">
        进行中
      </span>
      <a
        class="is-clickable"
        style="margin-left: 0.75rem"
        @click.stop="handleClickSetting">
        <span class="icon">
          <i class="iconfont icon-gear" />
        </span>
      </a>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    project: {},
    highlight: String
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

    parent () {
      return this.$parent.$parent
    },

    matchedText (value) {
      if (this.highlight === '') {
        return value
      }

      return typeof value === 'string' ? value.replace(
        this.highlight,
        `<strong class="has-background-warning">${this.highlight}</strong>`
      ) : value
    },

    handleClick () {
      this.$router.push({
        name: 'project tasks',
        params: {
          projectId: this.project.id,
          plantId: this.$route.params.plantId
        }
      })
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
