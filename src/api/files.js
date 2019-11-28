import request from '@/utils/request'
import qs from 'qs'

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
  archive(files, method = 'post', name = '') {
    const cfg = method === 'post' ? {
      data: files
    } : {
      params: { params: files },
      paramsSerializer: (params) => qs.stringify(params, { indices: false })
    }
    return request(Object.assign({
      url: `/api/fs/file/download/archive/${name}`,
      method,
      responseType: 'arraybuffer'
    }, cfg))
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
