'use strict'

// console.info('prod', require('./esp.global').GATEWAY_HOST)
module.exports = {
  NODE_ENV: '"production"',
  ESP_SYS_NAME: `"${process.env['npm_package_name']}"`,
  ESP_GATEWAY_HOST: `"${require('./esp.global').GATEWAY_HOST}"`
}
