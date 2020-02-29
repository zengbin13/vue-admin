//路由守卫
import router from "./index";
import store from "../store/index";

import { getToKen, removeToKen, removeUserName } from "../utils/cookie";

const whiteRoter = ["/login"]

router.beforeEach((to, from, next) => {
  if (getToKen()) {
    console.log("存在token");
    if(to.path === "/login") {
      removeToKen()
      removeUserName()
      store.commit('login/SET_TOKEN', "")
      store.commit('login/SET_USERNAME', "")
    }
    next();
  } else {
    console.log("不存在token");
    // console.log(from);
    // console.log(to);
    whiteRoter.indexOf(to.path) !== -1 ? next() : next("/login")
  }
});
