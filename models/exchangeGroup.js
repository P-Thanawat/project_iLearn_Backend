module.exports = (sequelize, DataTypes) => {
  const exchangeGroup = sequelize.define('exchangeGroup', {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    advertisementText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupPicture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupAbout: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      underscored: true
    }
  )
  exchangeGroup.associate = models => {
    exchangeGroup.hasOne(models.userGroup, {
      foreignKey: {
        name: 'exchangeGroupId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return exchangeGroup;
}