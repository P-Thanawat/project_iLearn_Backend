module.exports = (sequelize, DataTypes) => {
  const lessonOption = sequelize.define('lessonOption', {
    lessonTime: {
      type: DataTypes.DECIMAL, //? url
      allowNull: false
    },
    lessonPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },

    numberOfLesson: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    promotionPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
    {
      underscored: true
    }
  )
  lessonOption.associate = models => {
    lessonOption.belongsTo(models.lessons, {
      foreignKey: {
        name: 'lessonsId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return lessonOption;
}