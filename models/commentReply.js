module.exports = (sequelize, DataTypes) => {
  const commentReply = sequelize.define('commentReply', {
    commentReplyContent: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  commentReply.associate = models => {
    commentReply.belongsTo(models.postComment, {
      foreignKey: {
        name: 'postCommentId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    commentReply.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return commentReply;
}