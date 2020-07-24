import Vue from "vue";  // vue 默认指向 "vue/dist/vue.runtime.common.js" ——runtime
import App from "./App.vue";
//vue-router
import router from "./router/index";
import "./router/permit";
//vuex
import store from "./store";
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//composition-api
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi);

// 全局组件-svg
import './icons/index'
// 全局方法
import global from './utils/global'
Vue.use(global)

Vue.config.productionTip = false;


// runtime 模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
