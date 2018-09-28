<template>
  <div class="full-container">
    <div
      v-if="projectId != -1"
      class="full-container is-flex is-flex-column"
      style="padding: 0.5rem; padding-left: 0;">

      <div class="buttons has-addons" style="margin-right: 0.5rem">
        <a
          @click="$wait(() => handleTaskCreate())"
          class="button">
          <Icon name="create-record"/>
          <span>创建任务</span>
        </a>
      </div>

      <div style="height: 0.5rem"></div>

      <div class="table-container is-flex-auto">
        <div class="full-container" v-show="!loading">
          <table class="table is-bordered is-nowrapped">
            <thead>
              <th class="is-centered" style="width: 1px">#</th>
              <th>备注</th>
              <th>零件号</th>
              <th>工位</th>
              <th class="is-centered" style="width: 120px;">任务状态</th>
              <th class="is-centered" >截止日期</th>
              <th class="is-centered" >创建时间</th>
              <th class="is-centered">操作</th>
            </thead>
            <tbody>
              <tr v-for="(task, index) in tasks" :key="task.id">
                <td class="is-centered">{{index}}</td>
                <EditableCell
                  ref="comments"
                  :value="task.comment"
                  @change="$wait(() => updateComment({id: task.id, comment: $event}))"
                />
                <EditableCell
                  :value="task.part_id"
                  @change="$wait(() => updatePartId({id: task.id, partId: $event}))"
                />
                <EditableCell
                  :value="task.line_id"
                  @change="$wait(() => updateLineId({id: task.id, lineId: $event}))"
                />
                <StatusCell
                  :value="task.status"
                  :down="tasks.length - index > 4"
                  @change="$wait(() => updateStatus({id: task.id, status: $event}))"
                />
                <DuetimeCell
                  :id="task.id"
                  :value="task.duetime"
                  @change="$wait(() => updateDuetime({id: task.id, duetime: $event}))"
                />
                <td class="is-centered">{{task.created_at.slice(0, 10)}}</td>
                <td class="is-centered">
                  <a @click="handleClickDestroy(task.id)">
                    删除
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-show="loading" class="loading" />
      </div>

      <div style="margin-top: 0.5rem">
        <Pagination
          :meta="meta"
          @change-page="$page => { page = $page, search() }"
        />
      </div>
    </div>
    <router-view
      :project="project"
      :task="data[taskId]"
      :handleDestroy="destroyTask"
    />
  </div>
</template>

<script>
import tasks from '@/api/tasks'

import StatusCell from './status-cell'
import DuetimeCell from './duetime-cell'
import Pagination from '@/components/common/pagination'
import EditableCell from '@/components/common/editable-cell'

export default {
  name: 'ProjectTasks',

  components: {
    Pagination,
    StatusCell,
    DuetimeCell,
    EditableCell
  },

  props: {
    taskId: {},
    plantId: {},
    projectId: {},
    project: Object,
  },

  data () {
    return {
      data: {},
      list: [],
      meta: {},

      page: 1,
      query: '',
      loading: false,
      initialized: false,
    }
  },

  computed: {
    tasks () {
      return this.list.map(id => this.data[id])
    },

    params () {
      return {
        page: this.page,
        query: this.query,
        projectId: this.projectId
      }
    }
  },

  methods: {
    async handleTaskCreate () {
      const task = await tasks.create({projectId: this.projectId})
      this.list.splice(0, 0, task.id)
      this.$set(this.data, task.id, task)
      this.$nextTick(() => {
        // 运用 vue.js 的底层复用原理来寻找最新创建的 vnode
        this.$refs.comments[this.$refs.comments.length - 1].focus()
      })
    },

    async handleClickDestroy (id) {
      this.$router.push({
        name: 'task destroy',
        params: { taskId: id, ...this.$route.params }
      })
    },

    async search () {
      this.loading = true
      try {
        const dataSource = await tasks.search(this.params)
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

    async updateComment ({id, comment}) {
      await tasks.updateComment({id, comment})
      this.data[id].comment = comment
    },

    async updateStatus ({id, status}) {
      await tasks.updateStatus({id, status})
      this.data[id].status = status
    },

    async updateDuetime ({id, duetime}) {
      if (this.data[id].duetime === duetime) {
        duetime = null
      }
      await tasks.updateDuetime({id, duetime})
      this.data[id].duetime = duetime
    },

    async updatePartId ({id, partId}) {
      await tasks.updatePart({id, partId})
      this.data[id].part_id = partId
    },

    async updateLineId ({id, lineId}) {
      await tasks.updateLine({id, lineId})
      this.data[id].line_id = lineId
    },

    async destroyTask ({id}) {
      const task = await tasks.destroy({id})
      this.list.splice(this.list.indexOf(id), 1)
      this.$delete(this.data, id)
    }
  },

  watch: {
    'project.id': {
      immediate: true,

      async handler () {
        if (this.projectId !== -1 && this.projectId !== '-1') {
        this.initialized = false
          await this.search()
          this.initialized = true
        }
      }
    }
  }
}
</script>
