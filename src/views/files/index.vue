<template>
  <div class="app-container">
      <el-row>
        <el-button type="primary" @click="downloadPost">Downlaod Archive(POST)</el-button>
        <el-button type="primary" @click="downloadPostV2">Downlaod Archive(POST V2)</el-button>
        <el-button type="warning" @click="downloadGet">Downlaod Archive(GET)</el-button>
      </el-row>
      <el-row>
        <el-link type="primary" icon="el-icon-download" :href="href1">Download(No Name)</el-link>
        <el-link type="warning" icon="el-icon-download" :href="href2">Download(Has Name)</el-link>
      </el-row>
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
          // url: '/api/fs/file/download/archive',
          method: 'post',
          // responseType: 'blob',
          responseType: 'arraybuffer',
          data: files
      }).then(res => this.download(res)).catch(err => {
        console.error('download post:', err)
      })
    },
    downloadPostV2() {
      const files = []
      // this.ids.forEach((val, ind) => files.push({ id: val, fileName: ind % 2 === 0 ? `fileName-post${ind}`: null }))

      fetch({
          url: '/api/fs/file/download/archive/v2/业绩考核-POST-V2',
          method: 'post',
          // responseType: 'blob',
          responseType: 'arraybuffer',
          // responseType: 'stream',
          data: files
      }).then(res => {
          console.log(res)
          console.log(typeof res)
          // console.log(res.data)
          console.log(new Blob([res]))

          // const dataView = new DataView(res);
          // console.log(dataView)
          // const decoder = new TextDecoder('utf8')
          // console.log(decoder)
          // const coder = decoder.decode(dataView)
          // console.log(coder)
          // console.log(typeof coder)
          // const data = JSON.parse(coder)
          // console.log(data)

          // console.log(typeof data.data)

          // const buf = new ArrayBuffer(data.data.length * 2)
          // const bufView = new Uint16Array(buf)
          // for (let i = 0, len = data.data.lenght; i < len; i++) {
          //   bufView[i] = data.data.charCodeAt[i]
          // }
          // console.log(buf)
          // console.log(bufView)
          // console.log(new Blob([buf]))

          // const decoder = new TextDecoder('utf8')
          // console.log(decoder)
          // const u8a = new Uint8Array(res)
          // console.log(u8a)
          // const coder = decoder.decode(u8a)
          // console.log(coder)
          // const data = JSON.parse(coder)
          // console.log(data)
          
          // console.log(typeof data.data)

          // const url = window.URL.createObjectURL(new Blob([res]))
          // const link = document.createElement('a')
          // link.style.display = 'none'
          // link.href = url
          // link.setAttribute('download', 'xxx.zip')
          // document.body.appendChild(link)
          // link.click()
          // URL.revokeObjectURL(link.href)
          // link.remove()
      }).catch(err => {
        console.error('download post v2:', err)

        const dataView = new DataView(err);
        console.log(dataView)
        const decoder = new TextDecoder('utf8')
        console.log(decoder)
        const coder = decoder.decode(dataView)
        console.log(coder)
        console.log(typeof coder)
        const data = JSON.parse(coder)
        console.log(data)
      })
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
      }).then(res => this.download(res)).catch(err => {
        console.error('download get:', err)
      })
    },
    download(response) {
      console.log(typeof response)
      console.log(response)
      // console.log(new Blob([response]))

      // const dataView = new DataView(response);
      // console.log(dataView)
      // const decoder = new TextDecoder('utf8')
      // console.log(decoder)
      // const coder = decoder.decode(dataView)
      // console.log(coder)
      // console.log(typeof coder)
      // const data = JSON.parse(coder)
      // console.log(data)

      // console.log(new Uint8Array(response))
      // console.log(new Uint16Array(response))
      // console.log(String.fromCharCode.apply(null, new Uint8Array(response)))
      // console.log(String.fromCharCode.apply(null, new Uint16Array(response)))
      // console.log(new TextDecoder('utf-8').decode(response))
      const a = String.fromCharCode.apply(null, new Uint8Array(response))
      console.log(a)
      const b = decodeURIComponent(escape(a))
      console.log(b)

      // // const blob = new Blob([response], { type: 'application/octet-stream' })
      // const blob = new Blob([response], { type: 'text/plain' })
      // const reader = new FileReader()
      // // console.log(reader.readAsText(blob))
      // console.log(reader.readAsArrayBuffer(blob))
      // // console.log(reader.readAsText(blob, 'utf-8'))
      
      // ie
      // window.navigator.msSaveOrOpenBlob && 
      // navigator.msSaveBlob(new Blob([response]), filename)
      
      // chrome/firefox
      // const url = window.URL.createObjectURL(new Blob([response]))
      // const link = document.createElement('a')
      // link.style.display = 'none'
      // link.href = url
      // link.setAttribute('download', 'xxx.zip')
      // document.body.appendChild(link)
      // link.click()
      // URL.revokeObjectURL(link.href)
      // link.remove()
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