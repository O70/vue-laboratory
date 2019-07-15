'use strict'

// const merge = require('webpack-merge')
//
// const envs = {}
// for (let key of Object.keys(process.env)) {
//   if (typeof process.env[key] !== 'string') {
//     console.info(key, process.env[key])
//   }
//   envs[key] = `"${process.env[key]}"`
// }
//
// module.exports = merge(envs, {
//   NODE_ENV: '"production"'
//   // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
// })

console.info('prod')
module.exports = {
  NODE_ENV: '"production"',
  ESP_GATEWAY_HOST: `"${require('./esp.global').GATEWAY_HOST}"`
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
}
