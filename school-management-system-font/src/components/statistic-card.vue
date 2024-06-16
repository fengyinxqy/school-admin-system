<template>
  <div>
    <el-card>
      <el-statistic
        :value="value"
        :title="title"
        :style="{ minWidth: minWidth }"
      >
        <template slot="prefix">
          <slot name="prefix-icon"></slot>
        </template>
      </el-statistic>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StatisticCard",

  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    minWidth: {
      type: String,
      default: "100px",
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
