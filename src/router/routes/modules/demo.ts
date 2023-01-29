import type { RouteRecordRaw } from "vue-router";
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { CloudLayout } from "@/layouts";

const route: RouteRecordRaw = {
  path: "/demo",
  name: "demo",
  component: CloudLayout,
  redirect: "/demo/watermark",
  meta: {
    title: "Demo",
    icon: AppstoreOutlined,
    sort: 1,
  },
  children: [
    {
      path: "watermark",
      name: "watermark",
      component: () => import("@/views/demo/watermarkView.vue"),
      meta: {
        title: "水印",
        sort: 11,
      },
    },
    {
      path: "test2",
      name: "test2",
      component: () => import("@/views/about/AboutView.vue"),
      meta: {
        title: "二级菜单",
        sort: 12,
      },
      children: [
        {
          path: "test3",
          name: "test3",
          component: () => import("@/views/about/AboutView.vue"),
          meta: {
            title: "三级菜单",
            sort: 121,
          },
          children: [
            {
              path: "test4",
              name: "test4",
              component: () => import("@/views/about/AboutView.vue"),
              meta: {
                title: "四级菜单",
                sort: 1211,
              },
            },
          ],
        },
      ],
    },
    // {
    //   path: 'tick-form',
    //   name: 'tick-form',
    //   component: () => import('@/views/demo/tick-form/index.vue'),
    //   meta: {
    //     title: 'tick表单',
    //     sort: 11
    //   }
    // }
  ],
};

export default route;
