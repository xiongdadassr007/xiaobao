import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableData: [],
  },
  mutations: {
    changeTable(state, val) {
      state.tableData = val;
    },
  },
  actions: {},
  modules: {},
});
