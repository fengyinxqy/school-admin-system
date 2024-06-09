const { Controller } = require('egg');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password, confirmPassword, role } = ctx.request.body;

    // 验证两个密码是否相同
    if (password !== confirmPassword) {
      ctx.throw(400, '两次输入的密码不一致');
    }

    // 调用服务层方法进行用户注册
    const newUser = await ctx.service.user.register({ username, password, role });

    ctx.success({ message: '注册成功', data: newUser });
  }
}

module.exports = UserController;
