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
    const { username, password, gender, subject } = ctx.request.body;

    ctx.validate({
      username: { type: 'string', required: true },
      password: { type: 'string', required: false },
      gender: { type: 'enum', values: [ 'male', 'female' ], required: true },
      subject: { type: 'string', required: true },
    });

    const result = await service.teacher.createTeacher({ username, password, gender, subject });
    ctx.success({ message: '创建成功', data: result });
  }

}

module.exports = TeacherController;
