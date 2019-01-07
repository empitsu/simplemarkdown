import Vue from "vue";
import Router from "vue-router";
import Top from "./views/Top.vue";
import MyTerms from "./components/pages/MyTerms.vue";
// import Memo from "./components/pages/Memo.vue";
import MyEditor from "./components/pages/MyEditor.vue";
import MyHome from "./components/pages/MyHome.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "top",
      component: Top,
      children: [
        {
          path: "",
          name: "home",
          component: MyHome
        },
        {
          name: "memo",
          path: "memos/:memoId",
          component: MyEditor
        }
      ]
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
