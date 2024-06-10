import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref(null);

  const setUserInfo = (info) => {
    userInfo.value = info;
  };

  const clearUserInfo = () => {
    userInfo.value = null;
    localStorage.removeItem("userInfo");
    // 清除 Cookie 中的 token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 清除后重新登录
    window.location.reload();
  };

  return {
    userInfo,
    setUserInfo,
    clearUserInfo,
  };
});
