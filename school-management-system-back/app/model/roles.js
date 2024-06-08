module.exports = app => {
  const { STRING, TEXT, UUID, UUIDV4, DATE } = app.Sequelize;

  const Role = app.model.define('roles', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    role_name: { type: STRING(50), allowNull: false },
    permissions: { type: TEXT },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  return Role;
};
