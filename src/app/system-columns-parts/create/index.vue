<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="max-width: 560px;">
      <header class="modal-card-head">
        <p class="modal-card-title">添加流程属性</p>
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
  name: 'PartsColumnCreate',

  components: {
    IntelliForm
  },

  computed: {
    schema
  },

  methods: {
    ...mapActions({
      create: 'columns/create'
    }),

    handleClose () {
      this.$router.push({name: 'parts columns'})
    },

    async handleSubmit (params) {
      this.$wait(async () => {
        this.create(params)
        this.handleClose()
      })
    }
  }
}

function schema () {
  return {
    fields: [
      {
        type: 'input',
        key: 'name',
        text: '字段名',
        rules: [
          { name: 'required', message: '字段名不能为空' }
        ]
      },
      {
        type: 'input',
        key: 'text',
        text: '属性名',
        rules: [
          { name: 'required', message: '属性名称不能为空' }
        ]
      },
      {
        type: 'textarea',
        key: 'comment',
        text: '备注'
      },
      {
        type: 'auto',
        key: 'table',
        value: 'parts'
      }
    ],

    submit: {
      label: '创建属性',

      handler: this.handleSubmit
    },

    validation: {
      event: 'submit'
    }
  }
}
</script>
