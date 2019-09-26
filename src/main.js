import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import common from "@/common/common.js";
import store from "@/store";
import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../theme/index.css";
import "./assets/iconfont/iconfont.css";
import "default-passive-events";
import echarts from "echarts";
import SlideVerify from "vue-monoplasty-slide-verify";
import "lib-flexible";

Vue.use(SlideVerify);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(element, { size: "mini", zIndex: 3000 });

new Vue({
  router,
  store,
  common,
  render: h => h(App)
}).$mount("#app");
