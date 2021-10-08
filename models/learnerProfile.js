module.exports = (sequelize, DataTypes) => {
  const learnerProfile = sequelize.define('learnerProfile', {
    learnerAboutMe: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

  },
    {
      underscored: true
    }
  )
  learnerProfile.associate = models => {
    learnerProfile.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    learnerProfile.hasMany(models.following, {
      foreignKey: {
        name: 'learnerProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    learnerProfile.hasMany(models.follower, {
      foreignKey: {
        name: 'learnerProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    learnerProfile.hasMany(models.learnerSkill, {
      foreignKey: {
        name: 'learnerProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    learnerProfile.hasMany(models.profilePost, {
      foreignKey: {
        name: 'learnerProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return learnerProfile;
}