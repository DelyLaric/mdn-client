<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="max-width: 680px; max-height: 800px;">
      <header class="modal-card-head">
        <p class="modal-card-title">创建流程区域</p>
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
    columns: Array,
    plantId: [Number, String]
  },

  computed: {
    schema
  },

  methods: {
    ...mapActions({
      create: 'areas/create'
    }),

    handleClose () {
      this.$router.push({name: 'areas'})
    },

    async handleSubmit (params) {
      params.plantId = this.plantId
      params.columns = params.columns.sort((a, b) => a - b)
      this.$wait(async () => {
        await this.create(params)
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
        text: '流程区域表名',
        rules: [
          { name: 'required', message: '不能为空' }
        ]
      },
      {
        type: 'input',
        key: 'text',
        text: '流程区域名',
        rules: [{ name: 'required', message: '不能为空'}]
      },
      {
        type: 'textarea',
        key: 'comment',
        text: '备注'
      },
      {
        type: 'multi-select',
        key: 'columns',
        text: '流程属性',
        selectText: '区域属性',
        options: this.columns.map(column => ({
          value: column.id,
          text: column.text,
          disabled: column.is_fixed
        })),
        default: this.columns.filter(column => column.is_fixed).map(column => column.id)
      }
    ],

    submit: {
      label: '创建区域',

      handler: this.handleSubmit
    },

    validation: {
      event: 'submit'
    }
  }
}
</script>
