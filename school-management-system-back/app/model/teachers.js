module.exports = app => {
  const { STRING, ENUM, UUID, UUIDV4, DATE } = app.Sequelize;

  const Teacher = app.model.define('teachers', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    user_id: { type: UUID, allowNull: false },
    name: { type: STRING(100), allowNull: false },
    gender: { type: ENUM('male', 'female'), allowNull: false },
    subject: { type: STRING(50) },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  Teacher.associate = function() {
    Teacher.belongsTo(app.model.models.users, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return Teacher;
};
