import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// 注册全局组件
Vue.component('svg-icon', SvgIcon)


//解析下载的svg文件
const req = require.context('./svg', false, /\.svg$/) 
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
