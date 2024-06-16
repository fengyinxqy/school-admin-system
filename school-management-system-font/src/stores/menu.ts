import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    isCollapse: false,
  }),
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
