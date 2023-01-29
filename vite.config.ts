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
import { viteMockServe } from "vite-plugin-mock";
import { visualizer } from "rollup-plugin-visualizer";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = require("./package");
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

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
  const base = `${OssUrl}/${name}/${publicPathMap[mode]}/`;
  console.log("base", base);
  return base;
};

// useDevMode 开启时与热更新插件冲突,使用变量切换
// 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响
const useDevMode = true;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    base: mode === "development" ? "/" + name + "/" : getPublicPath(mode),
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
      viteMockServe({
        ignore: /^_/, // 正则匹配忽略的文件
        mockPath: "mock", // 设置 mock.ts 文件的存储文件夹
        localEnabled: true, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: true, // 设置生产环境是否启用 mock 功能
        watchFiles: true, // 设置是否监视mockPath对应的文件夹内文件中的更改
        // 代码注入
        injectCode: ` 
          import { setupProdMockServer } from '../mock/_createProductionServer';
          setupProdMockServer();
        `,
      }),
      visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
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
      proxy: {
        // 字符串简写写法
        "/foo": "http://localhost:4567",
        // 选项写法
        "/api": {
          target: "https://xxx.xxxx.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
        // 正则表达式写法
        "^/fallback/.*": {
          target: "http://xxxx.xxxx.com",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/fallback/, ""),
        },
        // 使用 proxy 实例
        // "/api": {
        //   target: "http://xxxx.xxxx.com",
        //   changeOrigin: true,
        //   configure: (proxy, options) => {
        //     // proxy 是 'http-proxy' 的实例
        //   },
        // },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
  return config;
});
