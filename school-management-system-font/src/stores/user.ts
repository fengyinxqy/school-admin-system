import { defineStore } from "pinia";

interface UserInfo {
  id: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface State {
  userInfo: UserInfo | null;
}
export const useUserStore = defineStore({
  id: "user",
  state: (): State => ({
    userInfo: null,
  }),
  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },
    clearUserInfo() {
      this.userInfo = null;
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // 清除后重新登录
      window.location.reload();
    },
  },
  persist: true,
});
