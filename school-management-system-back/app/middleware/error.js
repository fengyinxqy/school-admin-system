module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 在这里处理错误
      ctx.status = err.status || 500;
      ctx.body = {
        code: err.status,
        message: err.message,
      };
      // 可以记录错误日志等其他操作
      ctx.app.emit('error', err, ctx);
    }
  };
};
