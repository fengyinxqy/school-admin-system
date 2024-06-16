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
    // 调用register接口注册
    const user = await ctx.service.user.register({ username, password, confirmPassword: password, role: 'teacher' },
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

  async updateTeacher({ id, subject }) {
    const { ctx, app } = this;

    const transaction = await ctx.model.transaction();

    const teacher = await app.model.Teachers.findOne({ where: { id } });

    if (!teacher) {
      await transaction.rollback();
      ctx.throw(404, '教师不存在');
    }

    teacher.subject = subject;
    await teacher.save({ transaction });
    await transaction.commit();
    return { teacher };
  }

  async deleteTeacher(userId) {
    const { ctx, app } = this;
    const transaction = await ctx.model.transaction();

    const teacher = await app.model.Teachers.findOne({ where: { id: userId } });
    if (!teacher) {
      await transaction.rollback();
      ctx.throw(404, '教师信息不存在');
    }

    const user = await app.model.Users.findByPk(teacher.user_id);

    if (!user) {
      await transaction.rollback();
      ctx.throw(404, '用户不存在');
    }


    // 删除教师信息
    await teacher.destroy({ transaction });

    // 如果需要删除用户信息，可以取消注释以下代码
    await user.destroy({ transaction });

    await transaction.commit();
    return { success: true };
  }
}

module.exports = TeacherService;
