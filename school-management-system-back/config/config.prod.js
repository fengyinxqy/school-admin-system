/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1717858280040_6228';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    host: 'localhost',
    port: 3306,
    database: 'school_management',
    username: 'your_username',
    password: 'your_password',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      freezeTableName: true,
      timestamps: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
