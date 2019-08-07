/**
 * @Author 鬼王
 * @Date 2019/08/07 13:24
 */
'use strict'

const http = require('http')
const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname, '..', '/src/icons/svg/remote/')

fs.access(dir, fs.constants.W_OK, err => {
  console.log(`${dir} ${err ? 'does not exist' : 'exist'}`)

  err && fs.mkdir(dir, {}, err =>
    console.log(`${dir} create ${err ? `failed:\n ${err}` : 'success'}`))
})

module.exports =  () => {
  http.get('http://10.10.0.242:8083/svg/app-7.svg', res => {
    res.setEncoding('utf8')

    let rawData = ''

    res.on('data', chunk => { rawData += chunk })

    res.on('end', () => {
      fs.writeFile(`${dir}test.svg`, rawData, err => {
        if (err) {
          console.error(`Failed to write file: ${err}`)
        } else {
          console.log('The file has been saved!')
        }
      })
    })
  }).on('error', e => {
    console.error(`Got icon error: ${e.message}`)
  })
}
