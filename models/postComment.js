module.exports = (sequelize, DataTypes) => {
  const postComment = sequelize.define('postComment', {
    commentContent: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  postComment.associate = models => {
    postComment.belongsTo(models.profilePost, {
      foreignKey: {
        name: 'profilePostId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return postComment;
}