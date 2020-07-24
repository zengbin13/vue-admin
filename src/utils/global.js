//注册全局方法
export default {
  install(Vue, options) {
    Vue.prototype.$item = () => {
      confirm("xxx")
    }
  }
}