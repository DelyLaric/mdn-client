<template>
  <div v-if="project" class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 680px;">
      <header class="modal-card-head is-flex">
        <p class="modal-card-title is-flex" style="align-items: center">
          项目设置
        </p>

        <button
          class="delete"
          @click="handleClose">
        </button>
      </header>

      <section class="modal-card-body">
        <InputModifyField
          text="项目编号"
          :data="project.name"
          :handler="name => updateName({id: projectId, name})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          text="流程区域名"
          :data="project.text"
          :handler="text => updateText({id: projectId, text})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          width="320px"
          text="备注"
          :data="project.comment"
          :handler="comment => updateComment({id: projectId, comment})"
        />
        <!--<div style="height: 12px"></div>

        <ColumnsField
          :columns="columns"
          :data="project.column_ids"
          :handler="columns => updateColumns({id: projectId, columns})"
        /> -->
      </section>

      <div class="modal-card-foot">
        <a
          v-if="project.filed_at === null"
          @click="handleFile"
          class="button is-primary">
          归档
        </a>
        <a
          v-else
          @click="handleReopen"
          class="button is-success">
          重启
        </a>
        <a
          class="button is-danger"
          style="margin-left: auto"
          @click="$router.push({
            name: 'project delete',
            params: { plantId, projectId }
          })">
          删除项目
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import InputModifyField from '@/components/common/input-modify-field'

export default {
  components: {
    InputModifyField
  },

  props: {
    plantId: {},
    projectId: {}
  },

  computed: mapState({
    project (state) {
      return state.projects.data[this.projectId]
    }
  }),

  methods: {
    ...mapActions('projects', [
      'file',
      'reopen',
      'destroy',
      'updateName',
      'updateText',
      'updateComment'
    ]),

    handleFile () {
      this.$store.dispatch('wait', async () => {
        await this.file(this.project.id)
      })
    },

    handleReopen () {
      this.$store.dispatch('wait', async () => {
        await this.reopen(this.project.id)
      })
    },

    async handleDestroy () {
      await this.destroy(this.project.id)
    },

    handleClose () {
      this.$router.push({ name: 'plant projects' })
    }
  }
}
</script>
