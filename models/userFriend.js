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
        name: 'firstUserFriend',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userFriend.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'secondUserFriend',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return userFriend;
}