<template>
  <el-header class="header" height="50px">
    <div class="header-left">
      <el-button
        v-if="!isCollapse"
        class="fold-btn el-icon-s-fold"
        type="text"
        @click="changeCollapse"
      />
      <el-button
        v-else
        class="fold-btn el-icon-s-unfold"
        type="text"
        @click="changeCollapse"
      />
      学校管理系统
    </div>

    <div class="header-right">
      <span v-if="userInfo.username" class="welcome"
        >欢迎您，{{ userInfo.username }}</span
      >
      <el-dropdown trigger="click">
        <el-avatar :size="40" :src="avatar" class="header-avatar" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="clearUserInfo">
              <i class="el-icon-switch-button"></i>
              退出登录
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import avatar from "@/assets/img/avatar.png";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import { useMenuStore } from "@/stores/menu";
export default {
  name: "HeaderArea",

  data() {
    return {
      avatar,
      username: "",
    };
  },

  computed: {
    ...mapState(useUserStore, ["userInfo"]),
    ...mapState(useMenuStore, ["isCollapse"]),
  },

  methods: {
    ...mapActions(useMenuStore, ["changeCollapse"]),
    ...mapActions(useUserStore, ["clearUserInfo"]),
  },
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
  font-size: 25px;
  color: black;
  margin-left: 5px;
}

.header-right,
.header-left {
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
