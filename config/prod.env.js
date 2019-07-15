'use strict'

console.info('prod')
module.exports = {
  NODE_ENV: '"production"',
  ESP_SYS_NAME: `"${process.env['npm_package_name']}"`,
  ESP_GATEWAY_HOST: `"${process.env.ESP_GATEWAY_HOST || 'http://gateway.host.com'}"`
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
}
