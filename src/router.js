import Vue from "vue";
import Router from "vue-router";
import Top from "./views/Top.vue";
import MyTerms from "./components/pages/MyTerms.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "top",
      component: Top
    },
    {
      path: "/terms",
      name: "terms",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: MyTerms
    }
  ]
});
