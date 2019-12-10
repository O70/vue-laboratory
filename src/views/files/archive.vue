<template>
  <div class="app-container">
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <strong>Default</strong>
        </div>
        <div>
          <el-button type="primary" @click="archivePost">POST - Downlaod Archive</el-button>
          <el-button type="warning" @click="archiveGet">GET - Downlaod Archive</el-button>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <strong>Care</strong>
        </div>
        <div>
          <el-button type="primary" @click="archivePostCare">POST - Downlaod Archive</el-button>
          <el-button type="warning" @click="archiveGetCare">GET - Downlaod Archive</el-button>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <strong>Href</strong>
        </div>
        <div>
          <el-link :href="hrefs.link1" type="primary" icon="el-icon-download">Download(No Name)</el-link>
          <el-link :href="hrefs.link2" type="warning" icon="el-icon-download">Download(Has Name)</el-link>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { download } from '@/api/files'

export default {
  data() {
    const fids = [
      '119022001925914624',
      '119021998029406208',
      '119021999023456256',
      '119021999820374016',
      '119022000281747456',
      '119022000583737344',
      '119022000852172800'
    ]
    const posts = []
    const gets = []
    fids.forEach((val, ind) => {
      const m = ind % 2 === 0
      posts.push({ id: val, name: m ? `name-post${ind}` : null })
      gets.push(m ? `${val},name-get${ind}` : `${val}`)

      // File not found
      // posts.push({ id: val + '1', name: m ? `name-post${ind}` : null })
      // gets.push(m ? `${val + '1'},name-get${ind}` : `${val + '1'}`)

      // Params error
      // posts.push({ id: ' ', name: m ? `name-post${ind}` : null })
      // gets.push(m ? `${' '},name-get${ind}` : `${' '}`)
    })
    return {
      fids,
      files: { posts, gets },
      hrefs: { link1: null, link2: null }
    }
  },
  created() {
    this.hrefs.link1 = download.link(this.files.gets)
    this.hrefs.link2 = download.link(this.files.gets, '超链接下载')
  },
  methods: {
    archivePost() {
      // download.archive({ files: this.files.posts })
      download.archive({ files: this.files.posts, name: 'post下载' })
    },
    archiveGet() {
      // download.archive({ files: this.files.gets, method: 'get' })
      download.archive({ files: this.files.gets, method: 'get', name: 'get下载' })
    },
    archivePostCare() {
      download.archive({
        files: this.files.posts,
        care: true
      }).then(data => this.$notify({
        title: 'POST Blob',
        type: 'success',
        message: `Blob size: ${data.size}`
      })).catch(message => this.$notify.error({
        title: 'POST Error',
        message
      }))
    },
    archiveGetCare() {
      download.archive({
        files: this.files.gets,
        method: 'get',
        care: true
      }).then(data => this.$notify({
        title: 'GET Blob',
        type: 'success',
        message: `Blob size: ${data.size}`
      })).catch(message => this.$notify.error({
        title: 'GET Error',
        message
      }))
    }
  }
}
</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>
