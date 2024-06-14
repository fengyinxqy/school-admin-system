<template>
  <div>
    <el-container>
      <statistic-card
        class="statistic-card"
        :value="tableData.length"
        title="当前教师总数:"
      >
        <template #icon>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </statistic-card>
    </el-container>
    <el-container class="teacher-main">
      <div class="table-title">
        <span class="title">
          教师管理
        </span>
        <el-button
          type="primary"
          @click="openDialog"
        >
          新增老师
        </el-button>
      </div>
      <div class="table-content">
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column
            v-for="config in teacherTableConfig"
            :key="config.label"
            :label="config.label"
            :prop="config.prop"
            align="center"
          />
          <el-table-column align="right">
            <template #header>
              <el-input
                v-model="search"
                size="small"
                placeholder="输入关键字搜索"
              />
            </template>
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
              >
                Edit
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                Delete
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
    <el-dialog
      v-model="dialogFormVisible"
      title="新增教师"
    >
      <el-form
        ref="teacherForm"
        :model="form"
        :rules="rules"
      >
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="name"
          class="form-item"
        >
          <el-input
            v-model="form.name"
          />
        </el-form-item>

        <el-form-item
          label="学科"
          prop="subject"
          :label-width="formLabelWidth"
          class="form-item"
        >
          <el-select
            v-model="form.subject"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="subject in subjectMap"
              :key="subject.value"
              :label="subject.label"
              :value="subject.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="gender"
          :label-width="formLabelWidth"
        >
          <el-radio-group v-model="form.gender">
            <el-radio
              label="男"
              value="male"
            />
            <el-radio
              class="radio"
              label="女"
              value="female"
            />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="dialog-tip">
        默认密码为：123456
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取 消
          </el-button>
          <el-button
            type="primary"
            @click="handleCreateTeacher"
          >
            确 定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, getCurrentInstance } from 'vue';
import StatisticCard from '@/components/statistic-card.vue';
import { teacherTableConfig, subjectMap } from './teacher.config';
import { ElMessage } from 'element-plus';
const tableData = ref([])
const search = ref('')

const { proxy } = getCurrentInstance();

const getTeacherList = () => {
  proxy.$axios.get('/teachers').then((res) => {
    tableData.value = res.data.map((item) => {
      const { name, gender, subject, createdAt, updatedAt } = item
      return {
        name,
        gender,
        subject,
        createdAt: dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')
      }
    })
  })
}

getTeacherList();

const dialogFormVisible = ref(false)
const form = ref({
  name: '',
  gender: 'male',
  subject:''
})
const rules = ref({
  name:[
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { max: 16, message: '姓名不能超过16个字符', trigger: 'blur' }
  ],
  subject:[
    { required: true, message: '请选择学科', trigger: 'change' }
  ],
  gender:[
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
})
const formLabelWidth = '60px'
const openDialog = () => {
  dialogFormVisible.value = true
}

const teacherForm = ref()

const handleCreateTeacher = ()=>{
  teacherForm.value.validate((valid)=>{
    if(valid){
      const params = {
        username: form.value.name,
        gender: form.value.gender,
        subject: form.value.subject
      }

      proxy.$axios.post('/teachers',params).then((res)=>{
        ElMessage.success(res.message)
        getTeacherList()
        dialogFormVisible.value = false
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.statistic-card {
  max-width: 300px;
}

.teacher-main {
  margin-top: 20px;
  padding: 10px;
  background-color: #ecebeb;
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

.form-item{
  margin-bottom: 15px;
}

.radio{
  margin-left: 20px;
}

.dialog-tip{
  padding-left: 20px;
  margin-top: 10px;
  color: #E6A23C;
}
</style>