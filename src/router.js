import Vue from "vue";
import Router from "vue-router";
import TopComponent from "@/components/pages/top.vue";
import TermsComponent from "@/components/pages/terms.vue";
import _memoIdComponent from "@/components/pages/_memoId.vue";
import LoginComponent from "@/components/pages/login.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "top",
      component: TopComponent,
      children: [
        {
          path: "",
          name: "login",
          component: LoginComponent
        },
        {
          name: "memo",
          path: "memos/:memoId",
          component: _memoIdComponent
        }
      ]
    },
    {
      path: "/terms",
      name: "terms",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TermsComponent
    }
  ]
});
