module.exports = (sequelize, DataTypes) => {
  const groupPostComment = sequelize.define('groupPostComment', {
    commentContent: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  groupPostComment.associate = models => {
    groupPostComment.belongsTo(models.groupFeed, {
      foreignKey: {
        name: 'groupFeedId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    groupPostComment.hasMany(models.groupPostCommentReply, {
      foreignKey: {
        name: 'groupPostCommentId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return groupPostComment;
}