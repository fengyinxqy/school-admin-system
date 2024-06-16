<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :title="dialogTitle"
      width="400px"
    >
      <el-form ref="dialogForm" :model="form" :rules="rules">
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="name"
          class="form-item"
        >
          <el-input
            v-model="form.name"
            :disabled="type === 'edit'"
            class="dialog-input"
          />
        </el-form-item>

        <el-form-item
          label="学科"
          prop="subject"
          :label-width="formLabelWidth"
          class="form-item"
        >
          <el-select v-model="form.subject" placeholder="请选择活动区域">
            <el-option
              v-for="subject in subjectMap"
              :key="subject.value"
              :label="subject.label"
              :value="subject.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
          <el-radio-group v-model="form.gender" :disabled="type === 'edit'">
            <el-radio label="男" value="male" />
            <el-radio class="radio" label="女" value="female" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="dialog-tip">默认密码为：123456</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false"> 取 消 </el-button>
          <el-button type="primary" @click="confirm"> 确 定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { subjectMap } from "../teacher.config";
export default {
  name: "TeacherInfoDialog",

  data() {
    return {
      subjectMap,
      form: {
        id: "",
        name: "",
        gender: "男",
        subject: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 16, message: "姓名不能超过16个字符", trigger: "blur" },
        ],
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      formLabelWidth: "60px",
      dialogFormVisible: false,
      type: "add",
    };
  },

  computed: {
    dialogTitle() {
      return this.type === "add" ? "新增教师" : "编辑教师";
    },
  },

  methods: {
    /** @public */
    openDialog(type, data) {
      this.type = type;
      this.form = data;
      this.dialogFormVisible = true;
    },
    confirm() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          const { id, name, gender, subject } = this.form;
          const params = {
            id,
            name,
            subject,
            gender: gender === "男" ? "male" : "female",
          };
          const method = this.type === "add" ? "post" : "put";
          this.$axios[method]("/teachers", params).then((res) => {
            this.$message.success(res.message);
            this.$emit("add-teacher");
            this.dialogFormVisible = false;
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-input {
  width: 200px;
}

.dialog-tip {
  padding-left: 20px;
  color: #e6a23c;
}
</style>
