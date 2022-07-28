import type { RouteRecordRaw } from "vue-router";
import { SettingOutlined } from "@ant-design/icons-vue";
import { CloudLayout } from "@/layouts";

const route: RouteRecordRaw = {
  path: "/about",
  name: "about",
  component: CloudLayout,
  redirect: "/about",
  meta: {
    icon: SettingOutlined,
    single: true,
    title: "关于",
    sort: 4,
  },
  children: [
    {
      path: "",
      name: "about-page",
      component: () => import("@/views/AboutView.vue"),
    },
  ],
};

export default route;
