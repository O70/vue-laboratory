'use strict'

const merge = require('webpack-merge')

const envs = {}
for (let key of Object.keys(process.env)) {
  envs[key] = `"${process.env[key]}"`
}

module.exports = merge(envs, {
  NODE_ENV: '"production"'
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
})
