<template>
  <div class="page-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "SchoolManageSystemApp",

  data() {
    return {};
  },

  mounted() {
    // const localUserInfo = localStorage.getItem("userInfo");
    // if (localUserInfo) {
    //   userStore.setUserInfo(JSON.parse(localUserInfo));
    // }
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.page-container {
  height: 100vh;
}

.el-aside {
  background-color: #d9ecff;
}

.el-header,
.el-footer {
  background-color: #c6e2ff;
}
</style>
