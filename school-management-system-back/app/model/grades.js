module.exports = app => {
  const { DECIMAL, UUID, UUIDV4, DATE } = app.Sequelize;

  const Grade = app.model.define('Grade', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    student_id: { type: UUID, allowNull: false },
    course_id: { type: UUID, allowNull: false },
    grade: { type: DECIMAL(5, 2), allowNull: false },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  Grade.associate = function() {
    Grade.belongsTo(app.model.models.Student, { foreignKey: 'student_id', targetKey: 'id' });
    Grade.belongsTo(app.model.models.Course, { foreignKey: 'course_id', targetKey: 'id' });
  };

  return Grade;
};
