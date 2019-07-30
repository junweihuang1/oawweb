import Vue from "vue";
import Vuex from "vuex";
import { fstat } from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openTabs: [],
    activeIndex: "1",
    theme: "#0190A0",
    dialog_openTabs: [false, false, false, false]
  },
  mutations: {
    addTabs(state, Tabs) {
      state.openTabs.push(Tabs);
    },
    // 删除tabs
    delete_tabs(state, targetName) {
      let newlist = state.openTabs;
      state.openTabs = newlist.filter(item => item.id !== targetName);
    },
    clearTabs(state, flag = true) {
      state.openTabs = [];
    },
    changeActiveIndex(state, activeIndex) {
      state.activeIndex = activeIndex;
    }
    //dialog弹窗中的Tabs状态管理
  },
  actions: {
    changeActiveIndex(state, activeIndex) {
      console.log(111);
      state.activeIndex = activeIndex;
    }
  }
});
