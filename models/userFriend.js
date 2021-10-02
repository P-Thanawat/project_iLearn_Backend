module.exports = (sequelize, DataTypes) => {
  const userFriend = sequelize.define('userFriend', {
    userFriendOption: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      underscored: true
    }
  )
  userFriend.associate = models => {
    userFriend.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'firstUserFriend',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userFriend.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'secondUserFriend',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return userFriend;
}