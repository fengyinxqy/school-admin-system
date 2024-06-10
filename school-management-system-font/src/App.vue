<template>
  <div class="page-container">
    <router-view />
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';

const userStore = useUserStore();

onMounted(() => {
  const localUserInfo = localStorage.getItem('userInfo');
  if (localUserInfo) {
    userStore.setUserInfo(JSON.parse(localUserInfo));
  }
});
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
  