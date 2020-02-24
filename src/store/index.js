import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    navWidth: "200px",
  },
  getters: {}, //对state中数据的计算属性
  mutations: {
    SET_COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    SET_NAVWIDTH: (state, payload) => {
      if ( state.navWidth === "200px" ) {
        state.navWidth = payload.width + "px"
      } else {
        state.navWidth = "200px"
      }
    }
  },
  actions: {},
  modules: {}
});
