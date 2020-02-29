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

//composition-api
import VueCompositionApi from '@vue/composition-api'

//注册挂载
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

// 全局组件-svg
import './icons/index'

Vue.config.productionTip = false;


// runtime 模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
