import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', true, /\.svg$/)
req.keys().map(req)
