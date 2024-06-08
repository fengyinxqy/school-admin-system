module.exports = app => {
  const { STRING, ENUM, UUID, UUIDV4, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    username: { type: STRING(50), allowNull: false },
    password: { type: STRING(100), allowNull: false },
    role: { type: ENUM('admin', 'teacher', 'student', 'parent'), allowNull: false },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  return User;
};
