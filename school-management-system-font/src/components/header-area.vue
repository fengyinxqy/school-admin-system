<template>
  <el-header
    class="header"
    height="50px"
  >
    <el-button
      v-if="!isCollapse"
      class="fold-btn"
      icon="Fold"
      link
      @click="changeCollapse"
    />
    <el-button
      v-else
      class="fold-btn"
      icon="Expand"
      link
      @click="changeCollapse"
    />
    <div class="header-right">
      <span class="welcome">欢迎您，{{ username }}</span>
      <el-dropdown trigger="click">
        <el-avatar
          :size="40"
          :src="avatar"
          class="header-avatar"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <el-icon><SwitchButton /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import avatar from "@/assets/img/avatar.png";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useMenuStore } from '@/stores/menu.js';
const userStore = useUserStore();

const username = ref("");
if (userStore.userInfo) {
  username.value = userStore.userInfo.username || "";
}

const logout = () => {
  userStore.clearUserInfo();
};

const menuStore = useMenuStore();

const isCollapse = computed(()=>{
  return menuStore.isCollapsed
})

const changeCollapse = () => {
  menuStore.updateCollapse()
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
}

.fold-btn {
  font-size: 20px;
}

.header-right {
  display: flex;
  align-items: center;
}

.welcome {
  margin-right: 10px;
}

.header-avatar {
  cursor: pointer;
}
</style>
