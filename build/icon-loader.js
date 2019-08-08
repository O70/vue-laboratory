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
  fs.access(dir, fs.constants.W_OK, err => {
    console.log(`${dir} ${err ? 'does not exist' : 'exist'}`)

    if (!err) {
      fs.readdir(dir, {}, (err, files = []) => files.forEach(it => fs.unlinkSync(`${dir}${it}`)))
    }

    err && fs.mkdir(dir, {}, err =>
      console.log(`${dir} create ${err ? `failed:\n ${err}` : 'success'}`))
  })

  http.get(`${host}/svg/list`, res => {
    res.setEncoding('utf8')

    let rawData = ''

    res.on('data', chunk => { rawData += chunk })

    res.on('end', () => {
      (JSON.parse(rawData) || []).forEach(it => {
        fs.writeFile(`${dir}${it.name}`, it.content, err => {
          if (err) {
            console.error(`Failed to write file: ${err}`)
          } else {
            console.log('The file[%s] has been saved.', it.name)
          }
        })
      })
    })
  }).on('error', e => {
    console.error('Got icon error: %s', e.message)
  })
}
