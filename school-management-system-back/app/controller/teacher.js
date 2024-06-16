'use strict';

const { Controller } = require('egg');
/**
 * @Controller Teacher Management
 */
class TeacherController extends Controller {
  /**
   * @summary Get all teachers
   * @description Get a list of all teachers
   * @router get /teachers
   * @response 200 baseResponse Fetch success
   */
  async getAllTeacher() {
    const { ctx, service } = this;
    const teachers = await service.teacher.getAllTeachers();
    const teachersJSON = teachers.map(teacher => {
      const teacherObj = teacher.toJSON();
      teacherObj.gender = teacherObj.gender === 'male' ? '男' : '女';
      return teacherObj;
    });
    ctx.success({ message: '查询成功', data: teachersJSON });
  }

  async createTeacher() {
    const { ctx, service } = this;
    const { name, password, gender, subject } = ctx.request.body;

    ctx.validate({
      name: { type: 'string', required: true },
      password: { type: 'string', required: false },
      gender: { type: 'enum', values: [ 'male', 'female' ], required: true },
      subject: { type: 'string', required: true },
    });

    const result = await service.teacher.createTeacher({ username: name, password, gender, subject });
    ctx.success({ message: '创建成功', data: result });
  }

  async updateTeacher() {
    const { ctx, service } = this;
    const { id, subject } = ctx.request.body;


    ctx.validate({
      id: { type: 'string', required: true },
      subject: { type: 'string', required: true },
    });

    const result = await service.teacher.updateTeacher({ id, subject });
    this.logger.info(result);
    ctx.success({ message: '更新成功' });
  }

  async deleteTeacher() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const result = await ctx.service.teacher.deleteTeacher(id);
      this.logger.info(result);
      ctx.success({ message: '删除成功' });
    } catch (error) {
      ctx.body = {
        message: error.message,
      };
      ctx.status = error.status || 500;
    }
  }
}

module.exports = TeacherController;
