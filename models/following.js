module.exports = (sequelize, DataTypes) => {
  const following = sequelize.define('following', {
    followingOption: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  following.associate = models => {
    following.belongsTo(models.learnerProfile, {
      foreignKey: {
        name: 'learnProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    following.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return following;
}