import "vuetify/dist/vuetify.min.css";
import "@/assets/scss/style.scss";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
