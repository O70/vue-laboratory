<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <b>Default</b>
          </div>
          <div>
            <el-upload
              drag
              action="/api/fs/upload"
              multiple>
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <b>One-time upload</b>
          </div>
          <div>
            <el-upload
              ref="upload"
              :auto-upload="false"
              :http-request="handleRequest"
              drag
              action=""
              multiple>
              <i class="el-icon-upload"/>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </div>
          <el-button type="primary" @click="submit">Submit</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      formData: null
    }
  },
  methods: {
    handleRequest(file) {
      this.formData.append('files', file.file)
      // this.formData.set('file', file.file)
    },
    submit() {
      this.formData = new FormData()
      this.$refs.upload.submit()
      this.formData.set('type', 'image')

      axios.post('/api/fs/upload/multiple', this.formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        console.log(res)
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
</style>
