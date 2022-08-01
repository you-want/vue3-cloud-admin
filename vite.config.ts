import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import qiankun from "vite-plugin-qiankun";
import analyze from "rollup-plugin-analyzer";
import Unocss from "unocss/vite";

const { name } = require("./package");
const publicPathMap: { [key: string]: string } = {
  production: "prod",
  gray: "gray",
  test: "test",
  tice: "tice",
};
const getPublicPath = function (mode: string) {
  const OssUrl =
    mode === "production"
      ? "https://static0.xesimg.com/productdata-fileupload"
      : "https://static0-test.xesimg.com/productdata-fileupload";
  return `${OssUrl}/${name}/${publicPathMap[mode]}`;
};

// useDevMode 开启时与热更新插件冲突,使用变量切换
// 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响
const useDevMode = true;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    base: mode === "development" ? name : getPublicPath(mode),
    envDir: ".env",
    build: {
      // sourcemap: true,
      rollupOptions: {
        plugins: [analyze()],
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dirs: [],
        extensions: ["vue"],
        include: [/\.vue$/, /\.vue\?vue/],
        resolvers: [AntDesignVueResolver()],
        dts: "src/types/components.d.ts",
      }),
      AutoImport({
        imports: ["vue", "vue-router", "@vueuse/core"],
        resolvers: [AntDesignVueResolver()],
        dts: "src/types/auto-import.d.ts",
      }),
      // 这里的 'myMicroAppName' 是子应用名，主应用注册时 AppName 需保持一致
      qiankun(name, { useDevMode }),
      Unocss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
    },
  };
  return config;
});
