import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import instance from "./service/axios";
import "normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(PiniaVuePlugin);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

Vue.prototype.$axios = instance;

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

new Vue({
  router,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
