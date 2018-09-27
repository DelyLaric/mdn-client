<template>
  <div class="full-container is-flex is-flex-column" style="padding: 0.5rem">
    <div>
      <div class="field has-addons">
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
            <th></th>
            <th>位置代码</th>
            <th>零件号</th>
            <th>项目代码</th>
            <th>任务备注</th>
            <th
              v-if="column.name !== 'data_id'"
              v-for="column in columns" :key="column.id">
              {{column.text}}
            </th>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id">
              <th></th>
              <DataId
                :query="query"
                :task="task"
                :taskArea="task.taskArea"
                @change="$wait(() => updateLocation({task, dataId: $event}))"
              />
              <td>
                <QueryHighlighter
                  :text="task.part_id"
                  :query="query"
                />
              </td>
              <td>
                <QueryHighlighter
                  :text="task.project_id"
                  :query="query"
                />
              </td>
              <td>
                <QueryHighlighter
                  :text="task.comment"
                  :query="query"
                />
              </td>
              <td
                v-for="column in columns" :key="column.id"
                v-if="column.name !== 'data_id'">
                {{task.location[column.name]}}
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

import DataId from './data-id'
import Pagination from '@/components/common/pagination'
import EditableCell from '@/components/common/editable-cell'
import QueryHighlighter from '@/components/common/query-highlighter'

export default {
  name: 'TaskArea',

  components: {
    DataId,
    Pagination,
    EditableCell,
    QueryHighlighter
  },

  props: {
    plantId: {},
    areaId: {},
  },

  data () {
    return {
      list: [],
      data: {},
      meta: {},

      page: 1,
      query: '',
      loading: true,
      initialized: false
    }
  },

  computed: {
    params () {
      return {
        page: this.page,
        query: this.query,
        areaId: this.areaId,
      }
    },

    ...mapState({
      area (state) {
        return state.areas.data[this.areaId]
      },

      columns (state) {
        return this.area.columns.map(id => state.columns.data[id])
      },

      tasks () {
        return this.list.map(id => this.data[id])
      }
    })
  },

  methods: {
    async search () {
      this.loading = true

      try {
        const dataSource = await tasks.searchArea(this.params)
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

    async updateLocation ({task, dataId}) {
      const location = await tasks.updateAreaLocation({
        taskId: task.id,
        areaId: this.areaId,
        dataId: dataId
      })

      task.location = location
      task.taskArea.data_id = dataId
    },

    async handleQuery (event) {
      this.query = event.target.value.trim()
      if (this.query !== '') this.search()
    }
  },

  watch: {
    areaId: {
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
