<template>
  <el-container class="page-container">
    <side-bar />
    <el-container class="main-container">
      <header-area />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "@/components/side-bar.vue";
import HeaderArea from "@/components/header-area.vue";
export default {
  name: "HomeView",
  components: {
    SideBar,
    HeaderArea,
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.el-aside {
  background-color: #d9ecff;
}

.el-main {
  background-color: #f7f7f7;
}

.el-header {
  background-color: #c6e2ff;
}

.main-container {
  flex-direction: column;
}
</style>
