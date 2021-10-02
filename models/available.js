module.exports = (sequelize, DataTypes) => {
  const available = sequelize.define('available', {
    startAvailableTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endAvailableTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
    {
      underscored: true
    }
  )
  available.associate = models => {
    available.belongsTo(models.teacherProfile, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return available;
}