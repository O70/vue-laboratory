/**
 * @Author 鬼王
 * @Date 2019/08/07 13:24
 */
'use strict'

const http = require('http')
const path = require('path')
const fs = require('fs')

const host = require('../config/esp.global').GATEWAY_HOST
const dir = path.join(__dirname, '..', '/src/icons/svg/remote/')

module.exports = () => {
  new Promise(resolve => {
    fs.access(dir, fs.constants.W_OK, err => {
      console.log(`${dir} ${err ? 'does not exist' : 'exist'}`)

      if (!err) {
        fs.readdir(dir, {}, (err, files = []) => files.forEach(it => fs.unlinkSync(`${dir}${it}`)))
      }

      err && fs.mkdir(dir, {}, err =>
        console.log(`${dir} create ${err ? `failed:\\n ${err}` : 'success'}`))

      resolve()
    })
  }).then(() => {
    http.get(`${host}/svg/list`, res => {
      if (res.statusCode !== 200) {
        console.info('Request Failed.')
        // 消费响应数据来释放内存
        res.resume()
        return
      }

      res.setEncoding('utf8')

      let rawData = ''

      res.on('data', chunk => { rawData += chunk })

      res.on('end', () => {
        new Promise(resolve => {
          let res = { saved: [], errs: [] }
          const rdata = JSON.parse(rawData) || []
          const lastInd = rdata.length - 1

          rdata.forEach((it, ind) => {
            fs.writeFile(`${dir}${it.name}`, it.content, err => {
              res[err ? 'errs' : 'saved'].push(err || it.name)
              lastInd === ind && resolve(res)
            })
          })
        }).then(({ saved, errs }) => {
          errs.length > 0 && console.error('Failed to write file.', errs.join())
          saved.length > 0 && console.log('The file[%s] has been saved.', saved.join())
        })
      })
    }).on('error', e => {
      console.error('Got icon error: %s', e.message)
    })
  })
}
