<template>
  <div class="full-container">
    <div
      v-if="projectId != -1"
      class="full-container is-flex is-flex-column"
      style="padding: 0.5rem; padding-left: 0;">

      <div class="buttons has-addons" style="margin-right: 0.5rem">
        <a
          @click="handleTaskCreate"
          class="button">
          <Icon name="create-record"/>
          <span>创建任务</span>
        </a>
      </div>

      <div style="height: 0.5rem"></div>

      <div class="table-container is-flex-auto">
        <div class="full-container" v-if="!isLoading">
          <TaskInfos :tasks="tasks"/>
        </div>
        <div v-else class="loading" />
      </div>
    </div>
    <router-view
      :task="data[taskId]"
      :project="project"
    />
  </div>
</template>

<script>
import flatten from 'lodash/flatten'
import { mapState, mapGetters, mapActions } from 'vuex'

import TaskInfos from './primary'

export default {
  name: 'ProjectTasks',

  components: {
    TaskInfos
  },

  props: {
    taskId: {},
    projectId: {},
    project: Object,
  },

  data () {
    return {
      currentView: '基本信息'
    }
  },

  computed: {
    ...mapState({
      data: state => state.tasks.data,
      list: state => state.tasks.list,
      isLoading: state => state.tasks.isLoading,

      tasks (state) {
        return state.tasks.list.map(id => state.tasks.data[id])
      }
    }),

    plantId () {
      return this.$route.params.plantId
    }
  },

  methods: {
    ...mapActions({
      search: 'tasks/search',
      create: 'tasks/create'
    }),

    async handleTaskCreate () {
      let id
      await this.$wait(async () => {
        id = await this.create({projectId: this.projectId})
      })
      this.$refs.views[0].$refs['comment' + id][0].focus()
    }
  },

  watch: {
    projectId: {
      immediate: true,

      handler () {
        (this.projectId !== -1 && this.projectId !== '-1') && this.search()
      }
    }
  }
}
</script>
