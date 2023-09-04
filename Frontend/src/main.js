import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import { host } from "@/config/config";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = host;
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount("#app");
