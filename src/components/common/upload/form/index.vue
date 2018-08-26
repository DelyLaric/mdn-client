<template>
  <div class="full-container" style="padding: 0.5rem; overflow: auto">
    <UploadField />
    <FieldMatcher :columns="columns" />
    <Field>
      <Label>
        <span style="margin-right: 12px">
          重复数据处理
        </span>
        <Radio
          v-for="mode in uploadModes"
          :key="mode.name"
          :label="mode.label"
          :checked="currentUploadMode === mode.name"
          @click="SelectUploadMode(mode.name)">
        </Radio>
      </Label>
    </Field>
    <Field>
      <Control>
        <Button
          color="primary"
          :loading="loading"
          @click="handleSubmit">
          开始上传
        </Button>
      </Control>
    </Field>
  </div>
</template>

<script>
import {
  filterUniqueData,
  getUniqueDataByList,
  isUniqueKeysMatched
} from './_public'

import UploadField from './upload-field'
import FieldMatcher from './field-matcher'

export default {
  components: {
    UploadField,
    FieldMatcher
  },

  props: {
    unique: Array,

    columns: Array,

    handler: Function
  },

  inject: ['store'],

  data () {
    return {
      loading: false,
      uploadModes: [
        { name: 'ignore', label: '忽略' },
        { name: 'update', label: '更新' }
      ],

      currentUploadMode: 'ignore'
    }
  },

  methods: {
    SelectUploadMode (name = 'error') {
      this.currentUploadMode = name
    },

    handleSubmit () {
      const uniques = this.unique.length ? this.unique : []
      const columns = this.store.getters.matchedColumns

      let header = [[], []], uniqueKeys = [], unUniqueKeys = []

      if (!isUniqueKeysMatched(uniques, columns)) return

      columns.forEach(column => {
        if (uniques.indexOf(column.name) !== -1) {
          header[0].push(column.name)
          uniqueKeys.push(column.index)
        } else {
          header[1].push(column.name)
          unUniqueKeys.push(column.index)
        }
      })

      header = header[0].concat(header[1])

      let excelData = this.store.state['data.excel']

      if (excelData.length === 0) return

      this.loading = true

      setTimeout(async () => {
        let { uploadData, ignoredData } = filterUniqueData(excelData, uniqueKeys, unUniqueKeys)

        this.store.commit('setSuccessData', uploadData)
        this.store.commit('setIgnoredData', ignoredData)

        try {
          const successData = await this.handler({
            header: [...header],
            data: uploadData,
            unique: [...this.unique],
            conflict: this.currentUploadMode
          })

          this.store.commit('setSuccessData', successData)
          let conflictData = getUniqueDataByList(excelData, successData, uniqueKeys)
          this.store.commit('setErrorData', conflictData)
          this.store.commit('selectView', 'result')
        } finally {
          this.loading = false
        }
      }, 1)
    },
  }
}
</script>
