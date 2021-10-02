module.exports = (sequelize, DataTypes) => {
  const teacherSubject = sequelize.define('teacherSubject', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      underscored: true
    }
  )
  teacherSubject.associate = models => {
    teacherSubject.belongsTo(models.teacherProfile, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return teacherSubject;
}