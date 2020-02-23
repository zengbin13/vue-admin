import Vue from "vue";
// vue 默认指向 "vue/dist/vue.runtime.common.js" ——runtime
import App from "./App.vue";
import router from "./router";
import store from "./store";

//完全引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//composition-api
import VueCompositionApi from '@vue/composition-api'

//注册挂载
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

// 解析svg文件，使用svg组件
import './icons/index'

Vue.config.productionTip = false;


// runtime 模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
