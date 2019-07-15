'use strict'

const gh = process.env.ESP_GATEWAY_HOST || 'http://gateway.host.com'

console.info('global')
module.exports = {
  GATEWAY_HOST: gh,
  API_FS: `${gh}/api/fs`,
  FILE_PATH_ABS(relative_path = '') {
    const has = relative_path.includes('http://') || relative_path.includes('https://')
    return has ? relative_path : `${this.API_FS}${relative_path}`
  }
}
