// app/middleware/error_handler.js

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 校验错误处理
      if (err.errors) {
        ctx.status = 422;
        ctx.body = {
          code: 422,
          message: 'Validation Failed',
          errors: err.errors.map(e => ({
            field: e.field,
            message: e.message,
          })),
        };
      } else {
        // 其他错误处理
        ctx.status = err.status || 500;
        ctx.body = {
          code: ctx.status,
          message: err.message || 'Internal Server Error',
        };
      }
    }
  };
};
