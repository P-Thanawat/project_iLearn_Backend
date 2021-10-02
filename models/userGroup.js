module.exports = (sequelize, DataTypes) => {
  const userGroup = sequelize.define('userGroup', {
    userGroupOption: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  userGroup.associate = models => {
    userGroup.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userGroup.belongsTo(models.exchangeGroup, {
      foreignKey: {
        name: 'exchangeGroupId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return userGroup;
}