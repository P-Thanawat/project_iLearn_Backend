module.exports = (sequelize, DataTypes) => {
  const promotionCode = sequelize.define('promotionCode', {
    promotionCodeText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codeQuantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    minimumPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    maximumDiscount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    expireDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
    {
      underscored: true
    }
  )


  return promotionCode;
}