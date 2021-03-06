import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "@/plugins/axios";
import VueLazyload from "vue-lazyload";
import "normalize.css";
import "flex.css";
import "nprogress/nprogress.css";
import "dplayer/dist/DPlayer.min.css";
import "@/assets/style.scss";
import 'sal.js/dist/sal.css';

Vue.config.productionTip = false;
Vue.use(axios);
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require("@/assets/img/failed.svg"),
  loading: require("@/assets/img/loading.svg"),
  attempt: 1
});
Vue.prototype.$jump = url => {
  window.open(url);
};
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
