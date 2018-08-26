<template>
  <div class="full-container" style="padding: 0.5rem">
    <div v-show="view === 'result'">
      <Field>
        <Title level="4">
          上传结果
        </Title>
        <Control>
          <div class="table-content">
            <table class="table is-bordered is-fullwidth is-centered is-nowraped">
              <tbody>
                <tr>
                  <td>全部数据</td>
                  <td style="min-width: 150px">
                    <strong>
                      {{excelData.length}}
                    </strong>
                    条
                  </td>
                </tr>
                <tr>
                  <td>上传成功</td>
                  <td>
                    <strong>
                      {{successData.length}}
                    </strong>
                    条
                  </td>
                </tr>
                <tr>
                  <td>上传失败</td>
                  <td>
                    <u>
                      <a @click="view = 'error'">
                        {{errorData.length}} 条
                      </a>
                    </u>
                  </td>
                </tr>
                <!-- <tr>
                  <td>忽略数据</td>
                  <td>
                    <u>
                      <a class="has-text-danger">
                        {{excelData.length - successData.length}} 条
                      </a>
                    </u>
                  </td>
                </tr> -->
                <!-- <tr>
                  <td>Excel 重复</td>
                  <td>
                    <a>
                      {{ignoredData.length}}
                      条
                    </a>
                  </td>
                </tr> -->
              </tbody>
            </table>
          </div>
        </Control>
        <Divider height="0.5rem" />
        <Button @click="store.commit('selectView', 'form')">
          <Icon name="arrow-double-left" />
          <span>
            返回
          </span>
        </Button>
      </Field>
    </div>

    <DataTable
      :class="{'is-hidden': view !== 'error'}"
      :header="excelHeader"
      :data="errorData"
      @close="view = 'result'"
    />
  </div>
</template>

<script>
import DataTable from './DataTable'

export default {
  components: {
    DataTable
  },

  inject: ['store'],

  data () {
    return {
      'view': 'result'
    }
  },

  computed: {
    excelHeader () {
      return this.store.state['headers']
    },

    successData () {
      return this.store.state['data.success']
    },

    uploadData () {
      return this.store.state['data.upload']
    },

    errorData () {
      return this.store.state['data.error']
    },

    excelData () {
      return this.store.state['data.excel']
    },

    ignoredData () {
      return this.store.state['data.ignored']
    }
  }
}
</script>
