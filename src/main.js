import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../theme/index.css";
import "./assets/iconfont/iconfont.css";
import "default-passive-events";
import echarts from "echarts";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
