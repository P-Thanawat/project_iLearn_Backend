module.exports = (sequelize, DataTypes) => {
  const follower = sequelize.define('follower', {
    followingOption: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  follower.associate = models => {
    follower.belongsTo(models.learnerProfile, {
      foreignKey: {
        name: 'learnerProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    follower.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return follower;
}