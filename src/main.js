import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store";
Vue.prototype.$http = axios;
import router from "./routes";
new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});
