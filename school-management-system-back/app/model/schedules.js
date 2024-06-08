module.exports = app => {
  const { ENUM, TIME, UUID, UUIDV4, DATE } = app.Sequelize;

  const Schedule = app.model.define('schedules', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    course_id: { type: UUID, allowNull: false },
    teacher_id: { type: UUID, allowNull: false },
    classroom_id: { type: UUID, allowNull: false },
    day_of_week: { type: ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), allowNull: false },
    start_time: { type: TIME, allowNull: false },
    end_time: { type: TIME, allowNull: false },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  Schedule.associate = function() {
    Schedule.belongsTo(app.model.models.Course, { foreignKey: 'course_id', targetKey: 'id' });
    Schedule.belongsTo(app.model.models.teachers, { foreignKey: 'teacher_id', targetKey: 'id' });
    Schedule.belongsTo(app.model.models.classrooms, { foreignKey: 'classroom_id', targetKey: 'id' });
  };

  return Schedule;
};
