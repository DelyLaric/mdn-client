<template>
  <a
    @click="handleClick"
    style="display: flex; height: 60px"
    :class="{
      'panel-block': true,
      'is-active': isActive
    }">

    <span v-if="project.filed_at" class="tag is-primary">
      已归档
    </span>
    <span v-else class="tag is-success">
      进行中
    </span>

    <div style="margin-left: 20px; overflow: hidden;">
      <div>
        <p style="white-space: nowrap" v-html="matchedText(project.name)" />
      </div>
    </div>
    
    <div class="is-right is-flex" style="items-align: center; height: 1.5rem">
      <a
        v-show="isActive"
        class="is-clickable"
        style="margin-right: 0.75rem"
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
    projectId: {},
    project: {},
    highlight: String
  },

  computed: {
    isActive () {
      return this.projectId == this.project.id
    }
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
