<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    collapsible
    @collapse="collapseClick"
    class="layout-sider--fixed"
    collapsed-width="56"
  >
    <logo :show-title="!collapsed" />
    <Menu />
  </a-layout-sider>
</template>

<script setup lang="ts">
import Logo from "./LogoView.vue";
import Menu from "./MenuView.vue";

import { useCollapsed } from "../useCollapsed";

const { toggleCollapsed } = useCollapsed();

const collapsed = ref<boolean>(false);

const collapseClick = () => {
  toggleCollapsed();
};
</script>

<style scoped lang="less">
.layout-sider--fixed {
  height: 100%;
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  z-index: 20;
}
</style>
