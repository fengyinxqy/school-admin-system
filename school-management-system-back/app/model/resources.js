module.exports = app => {
  const { STRING, TEXT, UUID, UUIDV4, DATE } = app.Sequelize;

  const Resource = app.model.define('resources', {
    id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
    title: { type: STRING(100), allowNull: false },
    description: { type: TEXT },
    url: { type: STRING(255), allowNull: false },
    uploaded_by: { type: UUID, allowNull: false },
    createdAt: { type: DATE, defaultValue: app.Sequelize.NOW },
    updatedAt: { type: DATE, defaultValue: app.Sequelize.NOW },
  });

  Resource.associate = function() {
    Resource.belongsTo(app.model.models.users, { foreignKey: 'uploaded_by', targetKey: 'id' });
  };

  return Resource;
};
