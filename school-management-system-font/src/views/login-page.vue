<template>
  <div class="login-page">
    <el-container class="login-container">
      <el-row class="school-title" justify="space-between">
        <el-col :span="24">
          <div class="school-name">
            <el-icon size="36">
              <School />
            </el-icon>
            <span class="school-name-text">
              赫章县松林坡乡初级中学教学综合信息服务平台
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row class="login-card">
        <el-col :span="16" class="hidden-xs-only">
          <img src="../assets/img/login_bg_pic.jpg" alt="!" class="login-img" />
        </el-col>
        <el-col :xs="24" :sm="8" class="login-form-card">
          <div class="form-title">用户登录</div>
          <el-form ref="formRef" :model="form" :rules="rules">
            <el-form-item class="form-item" prop="username">
              <el-input v-model="form.username" placeholder="用户名">
                <template #prepend>
                  <i class="el-icon-user"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="password">
              <el-input v-model="form.password" placeholder="密码">
                <template #prepend>
                  <i class="el-icon-lock"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="form-item forget-password">
              <el-button type="text"> 忘记密码？ </el-button>
            </el-form-item>
            <el-form-item class="form-item">
              <el-button type="primary" class="login-btn" @click="submitForm">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: "LoginPage",

  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 16, message: "用户名不能超过16个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 16, message: "密码不能超过16个字符", trigger: "blur" },
        ],
      },
    };
  },

  computed: {},

  methods: {
    ...mapActions(useUserStore, ["setUserInfo"]),
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$axios.post("/login", this.form).then((res) => {
            const userInfo = res.data;
            this.setUserInfo(userInfo);
            this.$message.success("登录成功");
            this.$router.push("/");
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgb(250, 250, 250);
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1170px;
  margin: 0 15px;
}

.login-card {
  width: 100%;
  border: 4px solid #ededed;
  border-radius: 4px;
  background: #f5f5f5;
}

.school-title {
  width: 100%;
  margin: 25px 0px 45px;
  color: rgb(16, 105, 164);
}

.school-name {
  display: flex;
  align-items: center;
  font-size: 24px;
}

.school-name-text {
  margin-left: 10px;
}

.login-img {
  width: 100%;
}

.login-form-card {
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.7);
}

.form-title {
  font-weight: bold;
  margin-bottom: 20px;
}

.form-item {
  padding: 0 15px;
}

.forget-password {
  ::deep .el-form-item__content {
    justify-content: flex-end;
  }
}

.login-btn {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .login-container {
    width: 100%;
    max-width: 1170px;
  }
}

@media (max-width: 768px) {
  .login-container {
    width: 100%;
    margin: 0 15px;
  }
}
</style>
