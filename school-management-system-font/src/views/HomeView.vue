<template>
  <el-container
    class="page-container"
  >
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

<script setup>
import SideBar from '@/components/side-bar.vue'
import HeaderArea from '@/components/header-area.vue';
</script>

<style lang="scss" scoped>
.el-aside{
  background-color: #d9ecff;
}

.el-header,.el-footer{
  background-color: #c6e2ff;
}
</style>