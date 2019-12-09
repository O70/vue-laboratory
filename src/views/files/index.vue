<template>
  <div class="app-container">
    <el-row>
      <el-col align="right">
        <el-button-group>
          <el-button type="primary" icon="el-icon-upload" @click="drawer = !drawer">Upload</el-button>
          <el-button type="success" icon="el-icon-share">Archive</el-button>
          <el-button type="danger" icon="el-icon-delete">Clear</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row class="mt-10">
      <el-col>
        <el-table
          :data="table.data"
          max-height="700"
          border
          stripe>
          <el-table-column prop="name" label="Name"/>
          <el-table-column prop="contentType" label="Type" width="200"/>
          <el-table-column prop="suffix" label="Suffix" align="right" width="60"/>
          <el-table-column prop="size" label="Size" align="right" width="120"/>
          <el-table-column prop="path" label="Path"/>
          <el-table-column prop="createBy" label="Creator" align="center" width="120"/>
          <el-table-column prop="createTime" label="Time" align="center" width="180"/>
        </el-table>
      </el-col>
    </el-row>

    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      direction="rtl">
      <div style="margin: 20px;">
        <el-card shadow="hover">
          <div slot="header">
            <b>Default</b>
          </div>
          <el-upload
            :on-success="handleSuccess"
            drag
            action="/api/fs/file"
            multiple>
            <i class="el-icon-upload"/>
            <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
          </el-upload>
        </el-card>
        <el-card shadow="hover" class="mt-10">
          <div slot="header">
            <b>One-time upload</b>
          </div>
          <div>
            <div>
              <el-select v-model="appName" placeholder="Select...">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                  size="mini"/>
              </el-select>
              <el-button
                type="primary"
                @click="submit">Submit</el-button>
            </div>
            <el-upload
              ref="upload"
              :auto-upload="false"
              :http-request="handleRequest"
              drag
              action=""
              multiple
              class="mt-10">
              <i class="el-icon-upload"/>
              <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
            </el-upload>
          </div>
        </el-card>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      formData: null,
      appName: null,
      options: ['user', 'admin', 'order', 'supermarket'],
      table: {
        data: []
      },
      drawer: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      axios.get('/api/fs/file').then(({ data }) => {
        console.log('success: ', data)
        this.table.data = data.data
      })
    },
    handleSuccess(response, file, list) {
      console.log(response, file, list)
      this.getList()
    },
    handleRequest(file) {
      this.formData.append('files', file.file)
      // this.formData.set('file', file.file)
    },
    submit() {
      this.formData = new FormData()
      this.$refs.upload.submit()
      this.formData.set('app', this.appName)

      axios.post('/api/fs/file/multiple', this.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        console.log(res)
        this.getList()
      }).catch(err => {
        console.error('upload error: ' + err)
      })

      // axios.post('/api/fs/upload', this.formData, {
      //   headers: { 'Content-Type': 'application/json' }
      // }).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.error('upload error: ' + err)
      // })
    }
  }
}
</script>
<style>
  .text-c { text-align: center; }
  .mt-10 { margin-top: 10px; }
  .mb-20 { margin-bottom: 20px; }
</style>
