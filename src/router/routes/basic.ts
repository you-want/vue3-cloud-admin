import type { RouteRecordRaw } from "vue-router";
import { EnumPath } from "@/enums";
import { CloudLayout } from "@/layouts";

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "root",
    redirect: EnumPath.HOME,
  },
  {
    path: "/login",
    name: "login",
    component: CloudLayout,
    redirect: "/login",
    children: [
      {
        path: "",
        name: "login-page",
        component: () => import("@/views/login/IndexView.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: CloudLayout,
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "not-found-page",
        component: () => import("@/views/exception/ExceptionView.vue"),
      },
    ],
  },
];
