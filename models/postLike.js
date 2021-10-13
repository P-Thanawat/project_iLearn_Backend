module.exports = (sequelize, DataTypes) => {
  const postLike = sequelize.define('postLike', {


  },
    {
      underscored: true
    }
  )
  postLike.associate = models => {
    postLike.belongsTo(models.profilePost, {
      foreignKey: {
        name: 'profilePostId',
        allowNull: false
      },
      onDelete: 'CADCASE',
      onUpdate: 'RESTRICT'
    });
    postLike.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return postLike;
}