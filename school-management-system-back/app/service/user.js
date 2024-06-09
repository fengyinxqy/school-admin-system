const { Service } = require('egg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  // 用户登录方法
  async login({ username, password }) {

    const { ctx } = this;

    // 查找用户
    const user = await ctx.model.Users.findOne({ where: { username } });
    if (!user) {
      ctx.throw(400, '用户名不存在');
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      ctx.throw(400, '密码错误');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      this.config.jwt.secret,
      { expiresIn: '8h' } // 1小时过期
    );
    ctx.cookies.set('token', token, {
      maxAge: 8 * 60 * 60 * 1000,
      httpOnly: false,
      signed: true,
    });
    ctx.session.userId = user.id;

    // 不返回密码
    const userInfo = user.toJSON();
    delete userInfo.password;
    return userInfo;
  }
}

module.exports = UserService;
