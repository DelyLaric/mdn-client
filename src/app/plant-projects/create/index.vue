<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="max-width: 680px;">
      <header class="modal-card-head">
        <p class="modal-card-title">创建项目</p>
        <button
          class="delete"
          @click="handleClose">
        </button>
      </header>
      <section class="modal-card-body has-no-footer">
        <IntelliForm :schema="schema"/>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import IntelliForm from '@/components/common/form'

export default {
  components: {
    IntelliForm
  },

  props: {
    plantId: {},
    projectId: {}
  },

  computed: {
    schema
  },

  methods: {
    ...mapActions({
      create: 'projects/create'
    }),

    handleClose () {
      this.$router.push({
        name: 'project tasks',
        params: {
          plantId: this.plantId,
          projectId: this.projectId
        }
      })
    },

    async handleSubmit (params) {
      params.plantId = this.plantId
      this.create(params)
      this.handleClose()
    }
  }
}

function schema () {
  return {
    fields: [
      {
        type: 'input',
        key: 'name',
        text: '项目编号',
        rules: [
          { name: 'required', message: '不能为空' }
        ]
      },
      {
        type: 'input',
        key: 'text',
        text: '项目名称',
        rules: [{ name: 'required', message: '不能为空'}]
      },
      {
        type: 'textarea',
        key: 'comment',
        text: '备注'
      }
    ],

    submit: {
      label: '创建项目',

      handler: this.handleSubmit
    },

    validation: {
      event: 'submit'
    }
  }
}
</script>
