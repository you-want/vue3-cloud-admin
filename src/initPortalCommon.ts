import { createApp } from "vue";
import exception from "@/views/HomeView.vue";

export default function renderPortalCommonHeader() {
  const portalCommonHeader = createApp(exception);
  const element = document.getElementById("commonHeader");
  element && portalCommonHeader.mount(element);
}
