module.exports = (sequelize, DataTypes) => {
  const profilePost = sequelize.define('profilePost', {
    postContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postLike: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
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
  }

  return profilePost;
}