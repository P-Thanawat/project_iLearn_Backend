module.exports = (sequelize, DataTypes) => {
  const learnerSkill = sequelize.define('learnerSkill', {
    skill: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  learnerSkill.associate = models => {
    learnerSkill.belongsTo(models.learnerProfile, {
      foreignKey: {
        name: 'learnerProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return learnerSkill;
}