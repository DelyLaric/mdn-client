<template>
  <div v-if="!isLoading" class="full-container is-flex">

    <div
      class="is-flex is-flex-column"
      style="width: 300px; height: 100%; padding: 0.5rem;">
      <nav class="panel">
        <a
          class="panel-block has-text-grey"
          style="font-size: 1rem;"
          @click="$router.push({
            name: 'project create',
            params: $route.params
          })">
          <Icon name="plus-bold" />
          <span><strong>创建项目</strong></span>
        </a>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input
              v-model="query"
              @focus="isQueryFocus = true"
              @blur="isQueryFocus = false"
              class="input"
              type="text"
            >
            <span class="icon is-left">
              <i class="iconfont icon-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>

        <p class="panel-tabs">
          <a
            v-for="state in ['进行中', '已归档', '全部']"
            :key="state"
            v-text="state"
            @click="queryArchived = state"
            :class="{'is-active': state === queryArchived}"
          />
        </p>
        </nav>
        <div class="is-flex-auto is-bordered full-container">
          <el-scrollbar style="height: 100%; overflow: hidden">
              <div class="is-panel">
                <ProjectItem
                  v-for="id in listFilteredByQuery"
                  :highlight="isQueryFocus ? query : ''"
                  :key="id"
                  :project="data[id]"
                />
              </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="is-flex-auto">
        <router-view :project="data[$route.params.projectId]"/>
      </div>
  </div>
  <div v-else class="loading" />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import ProjectItem from './item'

export default {
  name: 'PlantProjects',

  components: {
    ProjectItem
  },

  data () {
    return {
      query: '',
      isQueryFocus: false,
      queryArchived: '进行中',

      selectedProjectId: null
    }
  },

  computed: {
    ...mapState({
      data: state => state.projects.data,
      list: state => state.projects.list,
      isLoading: state => state.projects.isLoading
    }),

    listFilteredByQuery () {
      let result = this.list
      if (this.query !== '') {
        result = this.list.filter(id => {
          const item = this.data[id]
          if (
            item.name.indexOf(this.query) !== -1 ||
            item.text.indexOf(this.query) !== -1 ||
            item.comment.indexOf(this.query) !== -1
          ) {
            return true
          } else {
            return false
          }
        })
      }

      switch (this.queryArchived) {
        case '进行中':
          result = result.filter(id => this.data[id].filed_at === null)
          break;

        case '已归档':
          result = result.filter(id => this.data[id].filed_at !== null)
          break;
      }

      return result
    }
  },

  methods: {
    ...mapActions({
      getDataSource: 'projects/getDataSource'
    }),

    ...mapMutations({
      setQuery: 'projects/setQuery'
    })
  },

  created () {
    // 读取 projects 时为了不引起阻塞
    // 将 projectId 设为 1
    // 进入 tasks 视图后，将会决定加载哪个 id

    const projectId = this.$route.params.projectId
    this.$router.push({
      name: 'project tasks',
      params: {
        plantId: this.$route.params.plantId,
        projectId: projectId ? projectId : -1
      }
    })
    this.getDataSource()
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/index.sass'

.is-panel
  .panel-block
    border-left: none
    border-right: none
    &:first-child
      border-top: none
    &.is-active
      background-color: $background
      border-right: 2px solid $info
</style>
