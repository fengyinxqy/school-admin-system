<template>
    <el-container class="page-container">
      <side-bar/>
      <el-container>
        <el-header>Header</el-header>
        <el-main><router-view></router-view></el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
</template>

<script>
import SideBar from '@/components/side-bar.vue'
export default{
  components:{
    SideBar
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  height: 100vh;

  
}

.el-aside{
  background-color: #d9ecff;
}

.el-header,.el-footer{
  background-color: #c6e2ff;
}
</style>
  