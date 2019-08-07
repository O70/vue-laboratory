const http = require('http')

// https://segmentfault.com/a/1190000014631915

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

// const fs = require('fs')
// console.info(fs)
// console.info(fs.writeFile)

let svgs = { id: 'gui', content: 'ddd' }

function getSvgs() {
  return new Promise((resolve, reject) => {
    http.get('http://10.10.0.242:8083/svg/app-7.svg', (res) => {
      // console.info(res)
      // res.header('Access-Control-Allow-Origin', '*')

      res.setEncoding('utf8')

      let rawData = ''
      res.on('data', (chunk) => { rawData += chunk })

      res.on('end', () => {
        try {
          // const parsedData = JSON.parse(rawData)
          // console.log(parsedData)
          // console.log(typeof rawData)
          resolve(rawData)
          // require('fs').writeFile('./svgs/test.svg', rawData, err => {
          //   console.info(err)
          // })
          // const svg = eval(rawData)
          // console.info(svg)
        } catch (e) {
          console.error(e.message)
          reject()
        }
      })
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`)
      reject()
    })
  })
}

// let a = await getSvgs()
// getSvgs().then(data => {
//   console.info(data)
//   svgs = data
// })

async function setSvgs() {
  svgs = await getSvgs()
  console.info(typeof svgs)
}

// setSvgs()

export default svgs
