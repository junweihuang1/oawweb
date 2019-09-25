import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openTabs: [],
    todoList: "",
    activeIndex: "1",
    commonUse: localStorage.getItem("commonUse")
      ? JSON.parse(localStorage.getItem("commonUse"))
      : [],
    theme: "#0190A0", //导航栏主题色
    fontColor: "#FFD700", //导航栏点击的字体颜色
    tableColor: "#4DB2BD", //表头颜色
    dialog_openTabs: [false, false, false]
  },
  mutations: {
    addTabs(state, Tabs) {
      state.openTabs.push(Tabs);
      //判断常用按钮中是否含有将要打开的路由，若没有将在头部插入
      if (
        !state.commonUse.some(item => item.id == Tabs.id) &&
        Tabs.title != "首页"
      ) {
        state.commonUse.unshift(Tabs);
        //限制长度不能超过10个，超过则在尾部删除
        if (state.commonUse.length > 5) {
          state.commonUse.pop();
        }
      } else {
        state.commonUse.forEach((item, index) => {
          if (item.id == Tabs.id && index != 0) {
            state.commonUse.unshift(item);
            state.commonUse.splice(index + 1, 1);
          }
        });
      }
      localStorage.setItem("commonUse", JSON.stringify(state.commonUse));
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
