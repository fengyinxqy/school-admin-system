module.exports = app => {
  const { STRING, TEXT, UUID, UUIDV4, DATE } = app.Sequelize;

  const Course = app.model.define('Course', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    name: { type: STRING(100), allowNull: false },
    description: { type: TEXT },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  return Course;
};
