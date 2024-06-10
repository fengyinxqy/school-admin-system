module.exports = () => {
  return async function auth(ctx, next) {
    const authorizationHeader = ctx.request.header.authorization;

    if (!authorizationHeader) {
      ctx.throw(401, '未登录');
    }

    const parts = authorizationHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      ctx.throw(401, '无效的授权头');
    }

    const token = parts[1];

    try {
      // 假设你使用 JWT 进行认证
      const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      ctx.state.user = decoded;
    } catch (err) {
      ctx.throw(401, '未登录');
    }

    await next();
  };
};
