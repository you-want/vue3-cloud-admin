<template>
  <a-layout>
    <layout-features />
    <layout-header />
    <a-layout>
      <layout-sidebar />
      <a-layout :class="getLayoutClass">
        <layout-content />
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
  @apply transition-all duration-200;

  padding-top: var(--header-height);
  padding-left: var(--sidebar-width);

  &--collapsed {
    padding-left: var(--sidebar-collapsed-width);
  }
}
</style>
