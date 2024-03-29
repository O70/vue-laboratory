import request from '@/utils/request'
import qs from 'qs'
import { Message } from 'element-ui'

const msgError = message => Message({ message, type: 'error', duration: 5 * 1000 })

const upload = {}

const download = {
  /**
   * Download archive
   * @param {Array} files
   *        post: [{ id: xx, fileName: xx }, { id: yy, fileName: yy }, ...]
   *        get: ['id-xx,fileName-xx', 'id-yy,fileName-yy', ...]
   * @param {String} method <post(default) | get>
   * @param {String} name Archive name
   * @returns {Promise}
   */
  archive({ files = [], method = 'post', name = '', care = false }) {
    return new Promise((resolve, reject) => {
      if (!files || files.length < 1) {
        (m => care ? reject(m) : msgError(m))('参数为空')
        return
      }

      const cfg = method === 'post' ? {
        data: files
      } : {
        params: { params: files },
        paramsSerializer: (params) => qs.stringify(params, { indices: false })
      }

      request(Object.assign({
        url: `/api/fs/file/download/archive/${name}`,
        method,
        responseType: 'arraybuffer'
      }, cfg)).then(res => {
        try {
          let error = null
          if ('TextDecoder' in window) {
            const dataView = new DataView(res)
            const decoder = new TextDecoder('utf-8')
            const coder = decoder.decode(dataView)
            error = JSON.parse(coder).message
          } else {
            // IE
            const str = String.fromCharCode.apply(null, new Uint8Array(res))
            error = decodeURIComponent(escape(JSON.parse(str).message))
          }

          care ? reject(error) : msgError(error)
        } catch (e) {
          const blob = new Blob([res])
          const filename = `${name || Date.parse(new Date())}.zip`
          care ? resolve(blob) : (() => {
            if (window.navigator.msSaveOrOpenBlob) {
              // IE
              navigator.msSaveBlob(blob, filename)
            } else {
              // chrome/firefox
              const url = window.URL.createObjectURL(new Blob([res]))
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
   *        ['id-xx,fileName-xx', 'id-yy,fileName-yy', ...]
   * @param {String} name Archive name
   * @return {String}
   */
  link(files, name = '') {
    const p = qs.stringify({ params: files }, { indices: false })
    return `/api/fs/file/download/archive/${name}?${p}`
  }
}

export { upload, download }
