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
        name: 'userAccountId',
        allowNull: false
      },
      as: 'messageFrom',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userMessenger.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'messageTo',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return userMessenger;
}