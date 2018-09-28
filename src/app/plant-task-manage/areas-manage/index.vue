<template>
  <div class="full-container is-flex is-flex-column" style="padding: 0.5rem">

    <div>
      <div class="field has-addons">
        <TaskStatusSelect v-model="taskStatus" />

        <div class="control">
          <input
            :value="query" class="input"
            type="text" style="width: 160px"
            @change="handleQuery"
            @keypress.enter="handleQuery"
          >
        </div>

        <div class="control">
          <a
            @click="search"
            :class="{'is-loading': loading}"
            class="button is-info">
            <Icon name="search"/>
          </a>
        </div>
      </div>
    </div>

    <div class="full-container is-flex-auto" style="margin-top: 0.5rem">
      <div class="table-container">
        <table v-if="!loading" class="table is-bordered is-nowrapped">
          <thead>
            <th>零件号</th>
            <th>工位</th>
            <th>项目编号</th>
            <th>项目状态</th>
            <th>任务备注</th>
            <th>任务状态</th>
            <th v-for="area in areas" :key="area.id">
              {{area.text}}
            </th>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <td>
                <QueryHighlighter
                  :text="task.part_id"
                  :query="query"
                />
              </td>
              <td>
                <QueryHighlighter
                  :text="task.line_id"
                  :query="query"
                />
              </td>
              <td>
                <QueryHighlighter
                  :text="task.project.name"
                  :query="query"
                />
              </td>
              <ProjectStatusCell :value="task.project.filed_at" />
              <td>
                <QueryHighlighter
                  :text="task.comment"
                  :query="query"
                />
              </td>
              <TaskStatusCell :value="task.status"/>
              <td class="is-centered" v-for="area in areas" :key="area.id">
                <Checkbox
                  @click="$wait(() => handleClickArea(task, area.id))"
                  :value="Boolean(task.areas[area.id])"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style="margin-top: 0.5rem">
      <Pagination :meta="meta" @change-page="($page) => {
        page = $page
        search()
      }"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import tasks from '@/api/tasks'

import TaskStatusCell from '../_common/TaskStatusCell'
import ProjectStatusCell from '../_common/ProjectStatusCell'
import TaskStatusSelect from '../_common/TaskStatusSelect'
import Pagination from '@/components/common/pagination'
import QueryHighlighter from '@/components/common/query-highlighter'

export default {
  name: 'TaskAreasManage',

  components: {
    Pagination,
    TaskStatusCell,
    ProjectStatusCell,
    TaskStatusSelect,
    QueryHighlighter
  },

  props: {
    plantId: {}
  },

  data () {
    return {
      list: [],
      data: {},
      meta: {},

      page: 1,

      query: '',
      taskStatus: null,

      loading: true,
      initialized: false
    }
  },

  computed: {
    params () {
      return {
        page: this.page,
        query: this.query,
        plantId: this.plantId,
        taskStatus: this.taskStatus
      }
    },

    ...mapState({
      tasks () {
        return this.list.map(id => this.data[id])
      }
    }),

    ...mapGetters({
      areasMapByPlantId: 'areas/mapByPlantId'
    }),

    areas () {
      return this.areasMapByPlantId[this.plantId]
    }
  },

  methods: {
    async search () {
      this.loading = true

      try {
        const dataSource = await tasks.searchAreas(this.params)
        this.data = {}
        this.list = []

        dataSource.data.forEach(item => {
          this.list.push(item.id)
          this.$set(this.data, item.id, item)
        })

        this.meta = dataSource
      } finally {
        this.loading = false
      }
    },

    async handleQuery (event) {
      this.query = event.target.value.trim()
      if (this.query !== '') this.search()
    },

    async handleClickArea (task, areaId) {
      if (task.areas[areaId]) {
        await tasks.removeArea({taskId: task.id, areaId})
        this.$delete(task.areas, areaId)
      } else {
        await tasks.addArea({taskId: task.id, areaId})
        this.$set(task.areas, areaId, {})
      }
    },
  },

  watch: {
    plantId: {
      immediate: true,
      async handler () {
        this.initialized = false
        await this.search()
        this.initialized = true
      }
    }
  }
}
</script>
