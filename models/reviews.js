module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    reviewPoint: {
      type: DataTypes.DECIMAL(10, 1), //? url
      allowNull: false
    },
    reviewMessage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fisrtTag: {
      type: DataTypes.STRING, //? text content
      allowNull: true,
    },
    secondTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thirdTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
    {
      underscored: true
    }
  )
  reviews.associate = models => {
    reviews.belongsTo(models.lessons, {
      foreignKey: {
        name: 'lessonsId',
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