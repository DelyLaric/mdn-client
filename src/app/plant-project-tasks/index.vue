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
      </div>

      <div style="height: 0.5rem"></div>

      <Control
        class="is-unselectable is-bordered"
        v-for="(viewGroup, index) in views"
        :key="index"
        style="min-height: 32px; padding: 8px; border-bottom: none">
        <Radio
          v-for="view in viewGroup"
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
            v-for="view in viewsFlatten"
            :is="view.component"
            :key="view.text"
            :tasks="tasks"
            :areas="areas"
            :area="view.area"
            :columns="columns"
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
import flatten from 'lodash/flatten'

import { mapState, mapGetters, mapActions } from 'vuex'

import TaskAreas from './areas'
import TaskInfos from './primary'
import TaskArea from './area'

export default {
  name: 'ProjectTasks',

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

      columns: state => state.columns.data,

      tasks (state) {
        return state.tasks.list.map(id => state.tasks.data[id])
      }
    }),

    ...mapGetters({
      areasMapByPlantId: 'areas/mapByPlantId'
    }),

    areas () {
      return this.areasMapByPlantId[this.plantId]
    },

    plantId () {
      return this.$route.params.plantId
    },

    views () {
      return [
        [
          { text: '基本信息', component: TaskInfos },
          { text: '区域管理', component: TaskAreas }
        ],
        this.areas.map(area => ({
          area: area,
          text: area.text,
          component: TaskArea
        }))
      ]
    },

    viewsFlatten () {
      return flatten(this.views)
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
