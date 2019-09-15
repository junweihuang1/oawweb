import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import ELEMENT from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../theme/index.css";
import "./assets/iconfont/iconfont.css";
import "default-passive-events";
import echarts from "echarts";
import SlideVerify from "vue-monoplasty-slide-verify";

Vue.use(SlideVerify);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(ELEMENT, { size: "mini", zIndex: 3000 });
// Vue.use(ELEMENT);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");