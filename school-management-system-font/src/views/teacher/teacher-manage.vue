<template>
  <div>
    <statistic-card
      class="statistic-card"
      :value="100"
      title="当前教师总数:"
    >
      <template #icon>
        <el-icon><User /></el-icon>
      </template>
    </statistic-card>
  </div>
</template>

<script setup>
import StatisticCard from '@/components/statistic-card.vue';
</script>

<style lang="scss" scoped>
.statistic-card{
  max-width: 300px;
}
</style>