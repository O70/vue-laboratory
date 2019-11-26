<template>
  <div class="app-container">
      <el-button type="primary" @click="downloadPost">Downlaod Archive(POST)</el-button>
      <el-button type="warning" @click="downloadGet">Downlaod Archive(GET)</el-button>
      <a :href="href1">Download(No Name)</a>
      <a :href="href2">Download(Has Name)</a>
  </div>
</template>
<script>
import fetch from '@/utils/request'

export default {
  data() {
    const ids = [
      '119022001925914624',
      '119021998029406208',
      '119021999023456256',
      '119021999820374016',
      '119022000281747456',
      '119022000583737344',
      '119022000852172800'
    ]

    return {
      ids,
      href1: null,
      href2: null
    }
  },
  created() {
    const qs = require('qs')

    const params = []
    this.ids.forEach((val, ind) => params.push(ind % 2 === 0 ? `${val},fileName-get${ind}` : `${val}`))
    const p = qs.stringify({ params }, { indices: false })
    console.log(p)

    this.href1 = `/api/fs/file/download/archive?${p}`
    this.href2 = `/api/fs/file/download/archive/超链接下载?${p}`
  },
  methods: {
    downloadPost() {
      const files = []
      // this.ids.forEach((val, ind) => files.push({ id: val }))
      this.ids.forEach((val, ind) => files.push({ id: val, fileName: ind % 2 === 0 ? `fileName-post${ind}`: null }))

      fetch({
          url: '/api/fs/file/download/archive/业绩考核-POST',
          // url: '/api/fs/file/download/archive ',
          method: 'post',
          responseType: 'blob',
          data: files
      }).then(res => this.download(res))
    },
    downloadGet() {
      const params = []
      // this.ids.forEach((val, ind) => params.push(`${val}`))
      // this.ids.forEach((val, ind) => params.push(`${val},fileName-get${ind}`))
      this.ids.forEach((val, ind) => params.push(ind % 2 === 0 ? `${val},fileName-get${ind}` : `${val}`))
      // this.ids.forEach((val, ind) => {
      //   if (ind == 2) {
      //     params.push(null)
      //   } else {
      //     params.push(ind % 2 === 0 ? `${val},fileName-get${ind}` : `${val}`)
      //   }
      // })
      
      const qs = require('qs')
      fetch({
          url: '/api/fs/file/download/archive/业绩考核-GET',
          // url: '/api/fs/file/download/archive',
          method: 'get',
          responseType: 'blob',
          // params: { params: qs.stringify(params, { indices: false }) }
          params: { params },
          // params: { params: this.ids },
          // params: { params: this.files },
          paramsSerializer: function(params) {
            // const p = qs.stringify(params, { arrayFormat: 'repeat' })
            // const p = qs.stringify(params, { indices: false })
            // const p = qs.stringify(params, { encode: true })
            const p = qs.stringify(params, { indices: false })
            // const p = qs.stringify(params, { indices: false, encode: false })
            console.log(p)
            return p
          }
      }).then(res => this.download(res))
    },
    download(response) {
      console.log(typeof response)
      console.log(response)
      console.log(new Blob([response]))

      let url = window.URL.createObjectURL(new Blob([response]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'xxx.zip')
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
    }
  }
}
</script>