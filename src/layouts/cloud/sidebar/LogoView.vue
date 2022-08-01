<template>
  <div class="logo flex items-center p-10px w-full">
    <img class="w-32px h-32px" :src="LogoUrl" alt="Logo" />
    <span v-show="showTitle" class="ml-8px text-white text-base font-bold">
      CloudAdmin
    </span>
  </div>
</template>

<script setup lang="ts">
import LogoUrl from "@/assets/logo.svg";

defineProps({
  showTitle: { type: Boolean, default: true },
});
</script>

<style scoped lang="less">
.logo {
  height: var(--header-height);
}
</style>
