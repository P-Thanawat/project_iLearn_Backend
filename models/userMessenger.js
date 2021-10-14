module.exports = (sequelize, DataTypes) => {
  const userMessenger = sequelize.define('userMessenger', {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  userMessenger.associate = models => {
    userMessenger.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'messageFrom',
        allowNull: false
      },
      as: 'messageFromUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userMessenger.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'messageTo',
        allowNull: false
      },
      as: 'messageToUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return userMessenger;
}