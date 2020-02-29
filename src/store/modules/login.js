import { Login } from "@/api/login";
import { setToKen, setUserName, getToKen, getUserName } from "../../utils/cookie"

const state = {
  to_ken: getToKen() || "",
  user_name: getUserName() || ""
};
const getters = {};
const mutations = {
  SET_TOKEN: (state, value) => {
    state.to_ken = value;
  },
  SET_USERNAME: (state, value) => {
    state.user_name = value;
  }
};
const actions = {
  login(context, data) {
    return new Promise((resolve, reject) => {
      //请求登录接口
      Login(data)
        .then(response => {
          //通过commit 存储token、username到vuex
          const { token, username } = response.data.data;
          context.commit("SET_TOKEN", token);
          context.commit("SET_USERNAME", username);
          //通过cookie本地存储token、username
          setToKen(token);
          setUserName(username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
