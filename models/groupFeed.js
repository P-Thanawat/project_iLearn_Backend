module.exports = (sequelize, DataTypes) => {
  const groupFeed = sequelize.define('groupFeed', {
    postContent: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  groupFeed.associate = models => {
    groupFeed.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'groupPostUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    groupFeed.belongsTo(models.exchangeGroup, {
      foreignKey: {
        name: 'exchangeGroupId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    groupFeed.hasMany(models.groupPostComment, {
      foreignKey: {
        name: 'groupFeedId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return groupFeed;
}