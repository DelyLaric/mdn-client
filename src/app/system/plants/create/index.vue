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
import { create } from '@/api/plants'
import { getLocalStore } from '../_runtime'

import IntelliForm from '@/components/common/form'

export default {
  components: {
    IntelliForm
  },

  data () {
    return {
      store: getLocalStore()
    }
  },

  computed: {
    schema
  },

  methods: {
    handleClose () {
      this.$router.push({name: 'plants'})
    },

    async handleSubmit (params) {
      this.$store.dispatch('wait', async () => {
        this.store.commit('addPlant', await create(params))
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
        text: '工厂名',
        rules: [
          { name: 'required', message: '工厂名不能为空' },
          { name: 'unique:plants,name', message: '工厂名已存在' }
        ]
      },
      {
        type: 'textarea',
        key: 'comment',
        text: '备注'
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
