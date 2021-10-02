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
    promotionTime: {
      type: DataTypes.DECIMAL, //? text content
      allowNull: false,
    },
    numberOfLesson: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    promotionPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
    {
      underscored: true
    }
  )
  lessonOption.associate = models => {
    lessonOption.belongsTo(models.lessons, {
      foreignKey: {
        name: 'lessonId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return lessonOption;
}