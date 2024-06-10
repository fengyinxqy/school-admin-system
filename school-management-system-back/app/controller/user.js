/* eslint-disable jsdoc/check-tag-names */
const { Controller } = require('egg');
const userValidator = require('../validator/user');
/**
 * @Controller User Management
 */
class UserController extends Controller {
  /**
   * @summary Register a new user
   * @description Register a new user with username, password and role
   * @router post register
   * @request body registerRequest *body
   * @response 200 baseResponse Registration success
   */
  async register() {
    const { ctx } = this;
    const { username, password, confirmPassword, role } = ctx.request.body;

    ctx.validate(userValidator.register);

    // 验证两个密码是否相同
    if (password !== confirmPassword) {
      ctx.throw(400, '两次输入的密码不一致');
    }

    // 调用服务层方法进行用户注册
    const newUser = await ctx.service.user.register({ username, password, role });

    ctx.success({ message: '注册成功', data: newUser });
  }

  /**
   * @summary User login
   * @description Login with username and password
   * @router post login
   * @request body loginRequest *body
   * @response 200 baseResponse Login success
   */
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    ctx.validate(userValidator.login);

    const user = await ctx.service.user.login({ username, password });

    ctx.success({ message: '登录成功', data: user });
  }
}

module.exports = UserController;
