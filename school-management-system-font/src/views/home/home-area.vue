<template>
  <el-container>
    <el-row class="date">
      <el-col>{{ currentTime }}</el-col>
      <el-col class="date-right">
        <el-row class="time">{{ currentDate }}</el-row>
        <el-row class="time">{{ currentDay }}</el-row>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import dayjs from "dayjs";
import { WEEK_DAY } from "@/lib/Enum.js";
export default {
  name: "HomeArea",
  components: {},
  data() {
    return {
      timer: null,
      currentTime: "",
      currentDate: "",
      currentDay: "",
      WEEK_DAY,
    };
  },

  computed: {},

  mounted() {
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
    this.currentDate = dayjs().format("YYYY-MM-DD");
    // 获取今天是本周第几天
    const weekDay = dayjs().day();
    this.currentDay = WEEK_DAY[weekDay];
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    updateTime() {
      this.currentTime = dayjs().format("HH:mm:ss");
    },
  },
};
</script>
<style lang="scss" scoped>
.home-carousel {
  justify-content: center;
}

.date {
  display: flex;
  align-items: center;
}

.time {
  width: 100px;
}

.date-right {
  margin-left: 10px;
}
</style>
