<template>
  <div class="app-container">
    <el-row>
      <el-col align="right">
        <el-button-group>
          <el-button type="primary" icon="el-icon-upload" @click="drawer = !drawer">Upload</el-button>
          <el-button type="success" icon="el-icon-download">Archive</el-button>
          <el-popconfirm
            title="Are you sure to clear all files?"
            confirm-button-text="Ok"
            cancel-button-text="Cancel"
            @onConfirm="handleClear">
            <el-button slot="reference" type="danger" icon="el-icon-delete">Clear</el-button>
          </el-popconfirm>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row class="mt-10">
      <el-col>
        <el-table
          :data="table.data"
          max-height="700"
          border
          stripe
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <!--<el-table-column prop="name" label="Name"/>-->
          <el-table-column label="Name">
            <template slot-scope="scope">
              <a :href="`/api/fs/file/download/${scope.row.id}`">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="contentType" label="Type" width="200"/>
          <el-table-column prop="suffix" label="Suffix" align="right" width="60"/>
          <el-table-column prop="size" label="Size" align="right" width="120"/>
          <el-table-column prop="path" label="Path"/>
          <el-table-column prop="createBy" label="Creator" align="center" width="100"/>
          <el-table-column prop="createTime" label="Time" align="center" width="160"/>
          <el-table-column
            fixed="right"
            align="center"
            label="Operations"
            width="100">
            <template slot-scope="scope">
              <el-button
                type="success"
                icon="el-icon-download"
                circle
                size="mini"
                @click="handleDownload(scope.row)"/>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="handleDelete(scope.$index, scope.row.id)"/>
            </template>
          </el-table-column>
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
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
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
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
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
      appName: '',
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
    handleSelectionChange(val) {
      // TODO: archive
      console.log(val)
      console.log(arguments)
    },
    handleDownload({ id, name }) {
      const newName = `mock-${name}`
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = `/api/fs/file/download/${id}/${newName}`
      link.setAttribute('download', newName)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
      link.remove()
    },
    handleDelete(index, rid) {
      axios.delete(`/api/fs/file/${rid}`).then(({ data }) => {
        this.table.data.splice(index, 1)
        console.log(data)
      })
    },
    handleClear() {
      axios.delete('/api/fs/file/clear').then(({ data }) => {
        this.table.data = []
        console.log(data)
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
