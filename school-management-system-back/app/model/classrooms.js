module.exports = app => {
  const { STRING, INTEGER, UUID, UUIDV4, DATE } = app.Sequelize;

  const Classroom = app.model.define('classrooms', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    room_number: { type: STRING(10), allowNull: false },
    capacity: { type: INTEGER },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  return Classroom;
};
