<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
</script>

<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<style>
@import "@/assets/base.css";
</style>
