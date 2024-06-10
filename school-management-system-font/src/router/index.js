import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import HomeView from "../views/HomeView.vue";
import LoginPage from "../views/login-page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/teacher-manage",
          name: "teacherManage",
          component: () => import("../views/teacher/teacher-manage.vue"),
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
