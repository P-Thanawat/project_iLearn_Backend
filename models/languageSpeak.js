module.exports = (sequelize, DataTypes) => {
  const languageSpeak = sequelize.define('languageSpeak', {
    language: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true
    }
  )
  languageSpeak.associate = models => {
    languageSpeak.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return languageSpeak;
}