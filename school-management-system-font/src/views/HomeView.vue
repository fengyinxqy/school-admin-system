<template>
  <el-container
    class="page-container"
  >
    <side-bar />
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- <router-view /> -->
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.el-aside{
  background-color: #d9ecff;
}

.el-header,.el-footer{
  background-color: #c6e2ff;
}
</style>