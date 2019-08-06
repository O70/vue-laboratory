import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
// requireAll(req)
req.keys().map(req)

// const querystring = require('querystring')
// const postData = querystring.stringify({
//   'msg': 'Hello World!'
// })
//
const http = require('http')
// const req1 = http.request({
//   hostname: 'http://10.10.0.242',
//   port: '8083',
//   path: '/svg/app-7.svg',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'X-Requested-With',
//     'Access-Control-Allow-Methods': '*'
//   }
// }, (res) => {
//   console.info(res)
// })
//
// req1.on('error', (e) => {
//   console.error(`problem with request: ${e.message}`)
// })
//
// // Write data to request body
// req1.write(postData)
// req1.end()
// console.info(postData)

http.get('http://10.10.0.242:8083/svg/app-7.svg', (res) => {
  console.info(res)
  // res.header('Access-Control-Allow-Origin', '*')

  res.setEncoding('utf8')

  let rawData = ''
  res.on('data', (chunk) => { rawData += chunk })

  res.on('end', () => {
    try {
      // const parsedData = JSON.parse(rawData)
      // console.log(parsedData)
      console.log(rawData)
    } catch (e) {
      console.error(e.message)
    }
  })
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})
