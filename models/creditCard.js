module.exports = (sequelize, DataTypes) => {
  const creditCard = sequelize.define('creditCard', {
    cardNumber: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    expiration: {
      type: DataTypes.DATE,
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