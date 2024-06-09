import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "./service/axios";
import "normalize.css";
import "element-plus/theme-chalk/display.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.config.globalProperties.$axios = axios;

app.use(ElementPlus, { zIndex: 3000 });
app.use(createPinia());
app.use(router);

app.mount("#app");
