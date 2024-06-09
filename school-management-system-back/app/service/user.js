const { Service } = require('egg');
const bcrypt = require('bcrypt');

class UserService extends Service {
  async register({ username, password, role }) {
    const { ctx, app } = this;

    // 检查用户名是否已经存在
    const Users = app.model.Users;
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      ctx.throw(400, '用户名已存在');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const newUser = await ctx.model.Users.create({
      username,
      password: hashedPassword,
      role,
    });

    this.logger.info(newUser.toJSON());

    return newUser.toJSON();
  }
}

module.exports = UserService;
