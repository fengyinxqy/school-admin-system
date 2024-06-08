module.exports = app => {
  const { STRING, TEXT, UUID, UUIDV4, DATE } = app.Sequelize;

  const Announcement = app.model.define('announcements', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    title: { type: STRING(100), allowNull: false },
    content: { type: TEXT },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  return Announcement;
};
