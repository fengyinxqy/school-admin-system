import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";

import HomeView from "../views/home-view.vue";
import LoginPage from "../views/login-page.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/data-analysis",
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/data-analysis",
          name: "dataAnalysis",
          component: () => import("../views/home/home-area.vue"),
        },
        {
          path: "/teacher-manage",
          name: "teacherManage",
          component: () => import("../views/teacher/teacher-manager.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get("token");
  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
