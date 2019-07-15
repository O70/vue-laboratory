'use strict'

console.info('process.env: ', process.env)
console.info('NODE_ENV: ', process.env.NODE_ENV)
console.info('ESP_GATEWAY_HOST:', process.env.ESP_GATEWAY_HOST)

const gh = process.env.ESP_GATEWAY_HOST || 'http://gateway.host.com'
console.info('gh', gh)

module.exports = {
  GATEWAY_HOST: gh,
  API_FS: `${gh}/api/fs`,
  FILE_PATH_ABS(relative_path = '') {
    const has = relative_path.includes('http://') || relative_path.includes('https://')
    return has ? relative_path : `${this.API_FS}${relative_path}`
  }
}
