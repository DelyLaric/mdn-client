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
          :handler="name => updateName({id, name})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          text="流程区域名"
          :data="project.text"
          :handler="text => updateText({id, text})"
        />
        <div style="height: 12px"></div>

        <InputModifyField
          width="320px"
          text="备注"
          :data="project.comment"
          :handler="comment => updateComment({id, comment})"
        />
      </section>

      <div class="modal-card-foot">
        <a
          v-if="project.filed_at === null"
          @click="$wait(() => file({id}))"
          class="button is-primary">
          归档
        </a>
        <a
          v-else
          @click="$wait(() => reopen({id}))"
          class="button is-success">
          开启
        </a>
        <a
          class="button is-danger"
          style="margin-left: auto"
          @click="$router.push({
            name: 'project destroy',
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
import { mapActions } from 'vuex'

import InputModifyField from '@/components/common/input-modify-field'

export default {
  name: 'ProjectManage',

  components: {
    InputModifyField
  },

  props: {
    plantId: {},
    projectId: {},
    project: Object
  },

  computed: {
    id () {
      return this.project.id
    }
  },

  methods: {
    ...mapActions('projects', [
      'file',
      'reopen',
      'destroy',
      'updateName',
      'updateText',
      'updateComment'
    ]),

    async handleDestroy () {
      await this.destroy({id: this.id})
      this.$router.push({
        name: 'plant projects',
        params: { plantId: this.plantId }
      })
    },

    handleClose () {
      this.$router.push({
        name: 'project tasks',
        params: {
          projectId: this.id,
          plantId: this.plantId
        }
      })
    }
  }
}
</script>
