<template>
  <div v-if="!isLoading" class="full-container is-flex">

    <div class="is-flex is-flex-column" style="width: 300px; height: 100%; padding: 0.5rem">
      <nav class="panel">
        <p class="panel-heading">
          项目
        </p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input
              v-model="query"
              @focus="isQueryFocus = true"
              @blur="isQueryFocus = false"
              class="input is-rounded"
              type="text"
            >
            <span class="icon is-left">
              <i class="iconfont icon-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <!-- <p class="panel-tabs">
          <a
            v-for="state in ['全部', '进行中', '已归档']"
            :key="state"
            v-text="state"
            @click="queryArchived = state"
            :class="{'is-active': state === queryArchived}"
          />
        </p> -->
      </nav>
        <div class="is-panel is-bordered is-flex-auto" style="overflow: auto">
          <ProjectItem
            v-for="id in listFilteredByQuery"
            :key="id"
            :project="data[id]"
          />
        </div>

        <a
          class="panel-block is-footer has-text-grey"
          style="font-size: 1rem;"
          @click="$router.push({
            name: 'project create',
            params: $route.params
          })">
          <Icon name="plus-bold" />
          <span><strong>创建项目</strong></span>
        </a>
      </div>
      <div class="is-flex-auto" style="padding: 0.5rem; padding-left: 0">
        <ProjectTasks />
      </div>
    <router-view />
  </div>
  <div v-else class="loading" />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import ProjectItem from './item'
import ProjectTasks from './task'

export default {
  name: 'PlantProjects',

  components: {
    ProjectItem,
    ProjectTasks
  },

  data () {
    return {
      query: '',
      isQueryFocus: false,
      queryArchived: '全部',
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
    this.getDataSource()
  }
}
</script>

<style lang="sass" scoped>
.is-panel
  .panel-block
    border-left: none
    border-right: none
    &:first-child
      border-top: none
</style>
