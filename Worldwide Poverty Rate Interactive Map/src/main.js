import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueHead from "vue-head";
import axios from "axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  axios,
  VueHead,
  render: (h) => h(App),
}).$mount("#app");

export default {
  data() {
    return {
      info: "",
    };
  },
};
