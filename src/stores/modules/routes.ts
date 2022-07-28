import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";

interface RouteState {
  routes: RouteRecordRaw[];
}

export const useRouteStore = defineStore("routes", {
  state: (): RouteState => ({
    routes: [],
  }),
  getters: {
    getRoutes: (state) => {
      return state.routes;
    },
  },
  actions: {
    appendRoute(
      route: GetArrayItemType<RouteRecordRaw[]> | RouteRecordRaw[]
    ): void {
      if (Array.isArray(route)) {
        this.routes.push(...route);
      } else {
        this.routes.push(route);
      }
    },
  },
});
