import Vue from "vue";
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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
