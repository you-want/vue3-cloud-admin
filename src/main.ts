import { createApp, type App } from "vue";
import { createWebHistory, type RouterHistory } from "vue-router";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

import app from "./App.vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/stores";
// import renderPortalCommonHeader from "./initPortalCommon";

import "@/styles/index.less";
import "uno.css";

let root: App;
let history: RouterHistory;

function render(props: any) {
  const { container } = props;
  root = createApp(app);

  setupStore(root);

  // 配置路由
  setupRouter(root);

  history = createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? "/appName-fe/" : "/"
  );

  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app");
  root.mount(c);

  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log("我正在作为子应用运行");
  }
}

renderWithQiankun({
  mount(props: any) {
    console.log("vue3sub mount");
    render(props);

    root.config.globalProperties.pRouter = props.parentRouter;
    root.config.globalProperties.pStore = props.parentStore;
    // portal 挂载自定义头部 需要时放开
    // renderPortalCommonHeader()
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("vue3sub unmount", props);
    root.unmount();
  },
  update(props: any) {
    console.log("vue3sub update");
    console.log(props);

    root.unmount();
    root._container.innerHTML = "";
    history.destroy(); // 不卸载 router 会导致其他应用路由失败
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
