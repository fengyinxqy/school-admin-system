const { Service } = require('egg');

class TeacherService extends Service {
  async getAllTeachers() {
    const { app } = this;
    const teachers = await app.model.Teachers.findAll();
    return teachers;
  }

  async createTeacher({ username, password = '123456', gender, subject }) {
    const { ctx, app } = this;
    const transaction = await ctx.model.transaction();

    const existingUser = await app.model.Users.findOne({ where: { username } });
    if (existingUser) {
      await transaction.rollback(); // 回滚事务
      ctx.throw(400, '用户已存在');
    }
    // 创建用户
    const user = await app.model.Users.create(
      { username, password, role: 'teacher' },
      { transaction }
    );

    // 创建教师
    const teacher = await app.model.Teachers.create(
      { user_id: user.id, name: username, gender, subject },
      { transaction }
    );

    await transaction.commit();
    return { teacher };
  }
}

module.exports = TeacherService;
