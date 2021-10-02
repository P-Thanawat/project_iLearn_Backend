module.exports = (sequelize, DataTypes) => {
  const groupPostCommentReply = sequelize.define('groupPostCommentReply', {
    commentReplyContent: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  groupPostCommentReply.associate = models => {
    groupPostCommentReply.belongsTo(models.groupPostComment, {
      foreignKey: {
        name: 'groupPostCommentId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return groupPostCommentReply;
}