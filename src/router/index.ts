import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CloudLayout from "@/layouts/CloudLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      redirect: "/home",
      component: CloudLayout,
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            title: "home",
          },
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          meta: {
            title: "about",
          },
          component: () => import("@/views/AboutView.vue"),
        },
      ],
    },
  ],
});

export default router;
