import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
// import svgss from './get-svg'
// const http = require('http')

// register globally
Vue.component('svg-icon', SvgIcon)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)
// requireAll(req)
req.keys().map(req)
// const svgs = req.keys().map(req)
// console.info(require('./get-svg'), Object.keys(require('./get-svg')))
// svgs.forEach(it => {
//   // console.info(it, Object.keys(it), Object.keys(it.default), it.default.content)
// })
//
// // console.info(svgs)
// // console.info(require('./get-svg'))
//
// function getSvgs() {
//   return new Promise((resolve, reject) => {
//     http.get('http://10.10.0.242:8083/svg/app-7.svg', (res) => {
//       // console.info(res)
//       // res.header('Access-Control-Allow-Origin', '*')
//
//       res.setEncoding('utf8')
//
//       let rawData = ''
//       res.on('data', (chunk) => { rawData += chunk })
//
//       res.on('end', () => {
//         try {
//           // const parsedData = JSON.parse(rawData)
//           // console.log(parsedData)
//           // console.log(typeof rawData)
//           resolve(rawData)
//           // require('fs').writeFile('./svgs/test.svg', rawData, err => {
//           //   console.info(err)
//           // })
//           // const svg = eval(rawData)
//           // console.info(svg)
//         } catch (e) {
//           console.error(e.message)
//           reject()
//         }
//       })
//     }).on('error', (e) => {
//       console.error(`Got error: ${e.message}`)
//       reject()
//     })
//   })
// }
//
// let svgs1 = null
// async function setSvgs() {
//   svgs1 = await getSvgs()
//   console.info(typeof svgs1)
// }
//
// setSvgs()

// import sg from '@/icons/svg/eye.svg'
// console.info(sg)

// require('../../build/icon-loader')()
// import a from '../../build/icon-loader'
// a()
