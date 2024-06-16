<template>
  <div>
    <el-container class="teacher-header">
      <div class="teacher-search">
        <div class="search-item">
          <span class="search-label">姓名</span>
          <el-input
            v-model="inputName"
            placeholder="请输入内容"
            class="search-input"
          ></el-input>
        </div>
        <div class="search-item">
          <span class="search-label">学科</span>
          <el-select v-model="subject" placeholder="请选择">
            <el-option
              v-for="item in subjectMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <el-divider class="divider"></el-divider>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </div>
    </el-container>
    <el-container class="teacher-main">
      <div class="table-title">
        <span class="title"> 教师管理 </span>
        <el-button type="primary" @click="openDialog('add')">
          新增老师
        </el-button>
      </div>
      <div class="table-content">
        <el-table
          v-loading="tableDataLoading"
          border
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" align="center" />
          <el-table-column
            v-for="config in teacherTableConfig"
            :key="config.label"
            :label="config.label"
            :prop="config.prop"
            align="center"
          />
          <el-table-column align="center" label="操作">
            <template #default="{ row }">
              <el-button size="small" @click="openDialog('edit', row)">
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="tableData.length"
          />
        </div>
      </div>
    </el-container>
    <teacher-info-dialog
      ref="teacherInfoDialog"
      @add-teacher="handleAddTeacher"
    ></teacher-info-dialog>
  </div>
</template>

<script>
import { teacherTableConfig, subjectMap } from "./teacher.config";
import dayjs from "dayjs";
import TeacherInfoDialog from "./components/teacher-info-dialog.vue";
export default {
  name: "TeacherManager",
  components: { TeacherInfoDialog },

  data() {
    return {
      teacherTableConfig,
      tableData: [],
      search: "",
      tableDataLoading: false,
      subject: "",
      inputName: "",
      subjectMap,
    };
  },

  mounted() {
    this.getTeacherList();
  },

  methods: {
    getTeacherList() {
      this.tableDataLoading = true;
      this.$axios
        .get("/teachers")
        .then((res) => {
          this.tableData = res.data.map((item) => {
            const { id, name, gender, subject, createdAt, updatedAt } = item;
            return {
              id,
              name,
              gender,
              subject,
              createdAt: dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
              updatedAt: dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            };
          });
        })
        .finally(() => {
          this.tableDataLoading = false;
        });
    },
    openDialog(type, data = {}) {
      this.$refs.teacherInfoDialog.openDialog(type, data);
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.delete(`/teachers/${row.id}`).then(() => {
            this.$message.success("删除成功");
            this.getTeacherList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAddTeacher() {
      this.getTeacherList();
    },
  },
};
</script>
<style lang="scss" scoped>
.statistic-card {
  max-width: 300px;
}

.teacher-main {
  margin-top: 20px;
  padding: 10px;
  background-color: #f2f6fc;
  width: 100%;
  flex-direction: column;
}

.title {
  font-size: 18px;
}

.table-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-content {
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.form-item {
  margin-bottom: 15px;
}

.radio {
  margin-left: 20px;
}

.dialog-tip {
  padding-left: 20px;
  margin-top: 10px;
  color: #e6a23c;
}

.teacher-search {
  display: flex;
  align-items: center;
}

.teacher-header {
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  padding: 10px;
}

.search-label {
  display: inline-block;
  margin-right: 5px;
}

.search-item {
  margin-right: 20px;
}

.search-input {
  width: 200px;
}

.divider {
  margin: 10px 0;
}
</style>
