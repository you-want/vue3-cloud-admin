<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="getCollapsed"
  >
    <template v-for="menu in menus" :key="menu.path">
      <menu-item v-if="menu.meta?.single" :menu="menu" />
      <menu-child
        v-else
        :current-depth="1"
        :parent-path="menu.path"
        :menu="menu"
      />
    </template>
  </a-menu>
</template>
<script setup lang="ts">
import MenuChild from "./MenuChild.vue";
import MenuItem from "./MenuItem.vue";
import { useCollapsed } from "@/layouts/cloud/useCollapsed";
import type { RouteRecordRaw } from "vue-router";
import { useRouteStore } from "@/stores";

const { getCollapsed } = useCollapsed();

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const router = useRouter();
const routeStore = useRouteStore();
const menus = ref<RouteRecordRaw[]>([]);

watch(
  () => routeStore.getRoutes,
  (routes) => {
    console.log(1111, routes);
    menus.value = routes;
  },
  { immediate: true }
);

// 当路由发生改变时，这里的 selectedKeys 也要发生改变
// 用于修复进入到不是菜单的路由时，这里的 selectedKeys 仍然是旧的问题
watch(
  () => router.currentRoute.value,
  (currentRoute) => {
    selectedKeys.value = [currentRoute.path];
  }
);

// 当刷新页面时，设置菜单选中状态
function setupCurrentMenu() {
  const currentRoute = router.currentRoute.value;
  selectedKeys.value = getCurrentMenuRecursive(menus.value, currentRoute.path);
  openKeys.value = selectedKeys.value;
}

setupCurrentMenu();

function getCurrentMenuRecursive(
  menus: RouteModuleList,
  targetKey: string,
  parentPath = "",
  parentMenus: GetArrayItemType<RouteModuleList>[] = []
) {
  let keys: string[] = [];
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    const path = parentPath ? `${parentPath}/${menu.path}` : menu.path;
    if (path === targetKey) {
      keys = [...parentMenus.map((item) => item.path), path];
      break;
    }
    if (menu.children) {
      keys = getCurrentMenuRecursive(menu.children, targetKey, path, [
        ...parentMenus,
        menu,
      ]);
      if (keys && keys.length) return keys;
    }
  }
  return keys;
}
</script>
