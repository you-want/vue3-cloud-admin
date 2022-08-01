import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";

type RouteModuleList = RouteRecordRaw[];

export const useRouteStore = defineStore({
  id: "route-store",
  state: () => ({
    routes: [],
  }),
  getters: {
    getRoutes: (state) => {
      return state.routes;
    },
  },
  actions: {
    appendRoute(
      route: GetArrayItemType<RouteModuleList> | RouteModuleList
    ): void {
      if (Array.isArray(route)) {
        this.routes.push(...route);
      } else {
        this.routes.push(route);
      }
    },
  },
});
