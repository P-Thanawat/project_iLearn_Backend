module.exports = (sequelize, DataTypes) => {
  const profilePost = sequelize.define('profilePost', {
    postContent: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    postPicture: {
      type: DataTypes.STRING,
      allowNull: true
    },

  },
    {
      underscored: true
    }
  )
  profilePost.associate = models => {
    profilePost.belongsTo(models.learnerProfile, {
      foreignKey: {
        name: 'learnerProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    profilePost.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'postUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    profilePost.hasMany(models.postComment, {
      foreignKey: {
        name: 'profilePostId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    profilePost.hasMany(models.postLike, {
      foreignKey: {
        name: 'profilePostId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return profilePost;
}