<template>
  <a-layout>
    <layout-features />
    <layout-header />
    <a-layout class="mt-64px child-box">
      <layout-sidebar />
      <a-layout :class="getLayoutClass">
        <layout-content class="" />
        <layout-footer />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import LayoutFeatures from "./LayoutFeatures.vue";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutSidebar from "./sidebar/LayoutSidebar.vue";
import LayoutContent from "./LayoutContent.vue";
import LayoutFooter from "./LayoutFooter.vue";

import { useCollapsed } from "./useCollapsed";

const { getCollapsed } = useCollapsed();

const getLayoutClass = computed(() => {
  return {
    "default-layout-main": true,
    "default-layout-main--collapsed": getCollapsed.value,
  };
});
</script>

<style scoped lang="less">
.default-layout-main {
  padding-left: var(--sidebar-width);

  &--collapsed {
    padding-left: var(--sidebar-collapsed-width);
  }
}
.child-box {
  height: calc(100vh - 64px);
}
</style>
