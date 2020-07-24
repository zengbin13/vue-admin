import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "index",
    hidden: true,
    meta: { name: "主页" }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue"),
    hidden: true,
    meta: { name: "登录" }
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    component: () => import("../views/Layout/index.vue"),
    meta: {
      name: "控制台",
      icon: "console"
    },
    children: [
      {
        path: "/index",
        component: () => import("../views/Console/console.vue"),
        meta: { name: "主页" }
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    redirect: "console",
    component: () => import("../views/Layout/index.vue"),
    meta: {
      name: "信息管理",
      icon: "info"
    },
    children: [
      {
        path: "/infoList",
        name: "InfoList",
        component: () => import("../views/Info/infoList.vue"),
        meta: { name: "信息列表" }
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        component: () => import("../views/Info/infoCategory.vue"),
        meta: { name: "信息分类" }
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    redirect: "userList",
    component: () => import("../views/Layout/index.vue"),
    meta: {
      name: "用户管理",
      icon: "user"
    },
    children: [
      {
        path: "/userList",
        component: () => import("../views/User/userList.vue"),
        meta: {
          name: "用户列表"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
