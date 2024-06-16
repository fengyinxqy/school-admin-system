<template>
  <el-container class="page-container">
    <side-bar />
    <el-container>
      <header-area />
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
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
  background-color: #fff;
}

.el-header,
.el-footer {
  background-color: #c6e2ff;
}
</style>
