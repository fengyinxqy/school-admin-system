<template>
  <el-aside
    :width="sideWidth"
    class="side-bar"
  >
    <h2 class="side-bar-title">
      <el-icon><Collection /></el-icon>
      <span
        v-if="!isCollapse"
        class="title-text"
      >
        教务管理系统
      </span>
    </h2>
    <el-menu
      background-color="#304156"
      text-color="#fff"
      :default-active="activeMenu"
      :collapse="isCollapse"
      class="el-menu-vertical"
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.id"
        :index="item.path"
        @click="$router.push(item.path)"
      >
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <span class="menu-item-label">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu.js';
import { computed } from 'vue';
import { Collection, Files, GoldMedal, Notification, Reading, School } from '@element-plus/icons-vue';
import { DataAnalysis,User,UserFilled } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';

const menuStore = useMenuStore();
const menuList = [
  {
    id: 1,
    name:'数据大屏',
    path:'/home',
    icon: DataAnalysis
  },
  {
    id: 2,
    name:'学生管理',
    path:'/student-manage',
    icon: User
  },
  {
    id: 3,
    name:'教师管理',
    path:'/teacher-manage',
    icon: UserFilled
  },
  {
    id: 4,
    name:'课程管理',
    path:'/course-manage',
    icon: Reading
  },
  {
    id: 5,
    name:'班级管理',
    path:'/class-manage',
    icon: School
  },
  {
    id: 6,
    name:'成绩管理',
    path:'/grade-manage',
    icon:GoldMedal
  },
  {
    id: 7,
    name:'通知公告',
    path:'/notice-manage',
    icon:Notification
  },
  {
    id: 8,
    name:'资源管理',
    path:'/resource-manage',
    icon:Files
  }
]

const router = useRoute()
const activeMenu = router.path

const isCollapse = computed(()=>{
  return menuStore.isCollapsed
})

const sideWidth = computed(()=>{
  return isCollapse.value ? '64px' : '200px'
})

</script>

<style lang="scss" scoped>
.side-bar{
  height: 100%;
  transition: width 0.3s ease-in-out;
}

.el-aside.side-bar{
  background-color: #304156;
}

.side-bar-title{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  color: #fff;
}

.title-text{
  margin-left: 5px;
  transition: opacity 0.3s;
}

:deep .el-menu-item.is-active{
  background-color: #243346;

  .menu-item-label{
    font-weight: 700;
  }
}

.el-menu-vertical{
  border-right: none;
}

.menu-item-label{
  font-size: 16px;
}

.menu-item-icon{
  color: #fff;
  font-size: 16px;;
}
</style>