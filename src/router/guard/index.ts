import type { Router } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createPermissionGuard } from "./permission";

export function setupRouterGuard(router: Router) {
  createProgressGuard(router);
  createPermissionGuard(router);
}

function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start();
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
