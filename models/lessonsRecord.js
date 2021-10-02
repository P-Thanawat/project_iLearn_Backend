module.exports = (sequelize, DataTypes) => {
  const lessonsRecord = sequelize.define('lessonsRecord', {
    startLearnTime: {
      type: DataTypes.STRING, //? url
      allowNull: false
    },
    endLearnTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN, //? text content
      allowNull: false,
    }
  },
    {
      underscored: true
    }
  )
  lessonsRecord.associate = models => {
    lessonsRecord.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'learner',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    lessonsRecord.belongsTo(models.lessons, {
      foreignKey: {
        name: 'lessonsId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return lessonsRecord;
}