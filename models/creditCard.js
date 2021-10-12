module.exports = (sequelize, DataTypes) => {
  const creditCard = sequelize.define('creditCard', {
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securityCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmCard: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  creditCard.associate = models => {
    creditCard.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return creditCard;
}