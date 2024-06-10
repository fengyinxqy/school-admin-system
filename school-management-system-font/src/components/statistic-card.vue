<template>
  <el-card>
    <el-statistic :value="props.value">
      <template #title>
        <div class="statistic-title">
          {{ props.title }}
        </div>
      </template>
      <template #prefix>
        <slot name="icon" />
      </template>
    </el-statistic>
  </el-card>
</template>

<script setup>
const props = defineProps({
  value:{
    type: Number,
    default: 0
  },
  title:{
    type:String,
    default:''
  }
})
</script>

<style lang="scss" scoped>
.statistic-title{
  font-size: 18px;
}
</style>