'use strict'

const GATEWAY_HOST = process.env.ESP_GATEWAY_HOST || 'http://gateway.host.com'

console.info('global', GATEWAY_HOST)
module.exports = {
  SYS_NAME: process.env.ESP_SYS_NAME,
  GATEWAY_HOST,
  API_FS: `${GATEWAY_HOST}/api/fs`,
  FILE_PATH_ABS(relative_path = '') {
    const has = relative_path.includes('http://') || relative_path.includes('https://')
    return has ? relative_path : `${this.API_FS}${relative_path}`
  }
}
