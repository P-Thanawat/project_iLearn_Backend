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
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });
    postComment.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    postComment.hasMany(models.commentReply, {
      foreignKey: {
        name: 'postCommentId',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    });
  }

  return postComment;
}