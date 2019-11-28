<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="archivePost">POST - Downlaod Archive</el-button>
      <el-button type="warning">GET - Downlaod Archive</el-button>
    </el-row>
    <el-row>
      <el-link :href="hrefs.link1" type="primary" icon="el-icon-download">Download(No Name)</el-link>
      <el-link :href="hrefs.link2" type="warning" icon="el-icon-download">Download(Has Name)</el-link>
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
    const posts = [], gets = []
    fids.forEach((val, ind) => {
      const m = ind % 2 === 0
      posts.push({ id: val, fileName: m ? `fileName-post${ind}` : null })
      gets.push(m ? `${val},fileName-get${ind}` : `${val}`)
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
      console.log('post')
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
