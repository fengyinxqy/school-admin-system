module.exports = app => {
  const { STRING, ENUM, UUID, UUIDV4, DATE } = app.Sequelize;

  const Student = app.model.define('Student', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    user_id: { type: UUID, allowNull: false },
    name: { type: STRING(100), allowNull: false },
    gender: { type: ENUM('male', 'female'), allowNull: false },
    birth_date: { type: DATE },
    grade: { type: STRING(10) },
    class: { type: STRING(10) },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  Student.associate = function() {
    Student.belongsTo(app.model.models.users, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return Student;
};
