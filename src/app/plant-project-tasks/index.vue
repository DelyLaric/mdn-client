<template>
  <div class="full-container">
    <!-- 加两层是为了 router-view 能够正确加载 -->
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

        <a
          class="button">
          <Icon name="bin"/>
          <span>删除</span>
        </a>
      </div>

      <div style="height: 0.5rem"></div>

      <Control
        class="is-unselectable is-bordered"
        style="min-height: 32px; padding: 8px; border-bottom: none">
        <Radio
          v-for="view in views"
          :key="view.text"
          :text="view.text"
          :value="currentView === view.text"
          @click="currentView = view.text"
        />
      </Control>

      <div class="table-container is-flex-auto">
        <div class="full-container" v-if="!isLoading">
          <component
            v-show="view.text === currentView"
            v-for="view in views"
            :is="view.component"
            :key="view.text"
            :tasks="tasks"
            ref="views"
          />
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
import { mapState, mapActions } from 'vuex'

import TaskAreas from './areas'
import TaskInfos from './primary'

export default {
  name: 'ProjectTasks',

  props: {
    taskId: {},
    projectId: {},
    project: Object,
  },

  data () {
    return {
      currentView: '基本信息',
      views: [
        { text: '基本信息', component: TaskInfos },
        { text: '流程区域', component: TaskAreas }
      ]
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

    // @danger
    parent () {
      return this.$parent
    },

    areas () {
      return this.areasId[this.plantId].map(id => this.data[id])
    },

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

      this.$refs.views[0].$refs.items.find(
        item => item.project.id === id
      ).$refs.comment.focus()
    },

    needToUpdate () {
      return this.parent.list.indexOf(this.projectId) !== -1
    }
  },

  watch: {
    projectId: {
      immediate: true,

      handler () {
        this.search()
      }
    }
  }
}
</script>
