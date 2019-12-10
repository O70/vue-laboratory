// import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const msgError = message => Message({ message, type: 'error', duration: 5 * 1000 })

const upload = {}

const download = {
  /**
   * Download archive
   * @param {Object} config
   * @example
   *          post: [{ id: xx, name: xx }, { id: yy, name: yy }, ...]
   *          get: ['id-xx,name-xx', 'id-yy,name-yy', ...]
   * @param {Array} config.files
   * @param {string} config.method <post(default) | get>
   * @param {string} config.name Archive name
   * @param {boolean} config.care default false
   * @returns {Promise<any>}
   */
  archive(config) {
    const { files = [], method = 'post', name = '', care = false } = config
    return new Promise((resolve, reject) => {
      if (!files || files.length < 1) {
        (m => care ? reject(m) : msgError(m))('Parameter is empty.')
        return
      }

      const cfg = method === 'post' ? {
        data: files
      } : {
        params: { params: files },
        paramsSerializer: (params) => qs.stringify(params, { indices: false })
      }

      axios(Object.assign({
        // url: `/api/fs/file/download/archive/${name}`,
        url: `/api/fs/file/archive/${name}`,
        method,
        responseType: 'arraybuffer'
      }, cfg)).then(({ data }) => {
        try {
          let error = null
          if ('TextDecoder' in window) {
            const dataView = new DataView(data)
            const decoder = new TextDecoder('utf-8')
            const coder = decoder.decode(dataView)
            error = JSON.parse(coder).message
          } else {
            // IE
            const str = String.fromCharCode.apply(null, new Uint8Array(data))
            error = decodeURIComponent(escape(JSON.parse(str).message))
          }

          care ? reject(error) : msgError(error)
        } catch (e) {
          const blob = new Blob([data])
          const filename = `${name || Date.parse(new Date())}.zip`
          care ? resolve(blob) : (() => {
            if (window.navigator.msSaveOrOpenBlob) {
              // IE
              navigator.msSaveBlob(blob, filename)
            } else {
              // chrome/firefox
              const url = window.URL.createObjectURL(new Blob([data]))
              const link = document.createElement('a')
              link.style.display = 'none'
              link.href = url
              link.setAttribute('download', filename)
              document.body.appendChild(link)
              link.click()
              URL.revokeObjectURL(link.href)
              link.remove()
            }
          })()
        }
      })
    })
  },
  /**
   * Get href
   * @param {Array} files
   *        ['id-xx,name-xx', 'id-yy,name-yy', ...]
   * @param {String} name Archive name
   * @return {String}
   */
  link(files, name = '') {
    const p = qs.stringify({ params: files }, { indices: false })
    return `/api/fs/file/download/archive/${name}?${p}`
  }
}

export { upload, download }
