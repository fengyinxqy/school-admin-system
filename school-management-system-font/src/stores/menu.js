import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const isCollapsed = ref(false);

  const updateCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  return {
    isCollapsed,
    updateCollapse,
  };
});
