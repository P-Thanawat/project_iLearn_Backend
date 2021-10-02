module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    reviewPoint: {
      type: DataTypes.DECIMAL, //? url
      allowNull: false
    },
    reviewMessage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fisrtTag: {
      type: DataTypes.STRING, //? text content
      allowNull: false,
    },
    secondTag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thirdTag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      underscored: true
    }
  )
  reviews.associate = models => {
    reviews.belongsTo(models.teacherProfile, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    reviews.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return reviews;
}