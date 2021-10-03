module.exports = (sequelize, DataTypes) => {
  const lessons = sequelize.define('lessons', {
    lessonName: {
      type: DataTypes.STRING, //? url
      allowNull: false
    },
    lessonDetail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lessonPicutre: {
      type: DataTypes.STRING, //? text content
      allowNull: false,
    },
    firstTypeTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondTypeTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thirdTypeTag: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
    {
      underscored: true
    }
  )
  lessons.associate = models => {
    lessons.belongsTo(models.teacherProfile, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    // lessons.hasOne(models.teacherProfile, {
    //   foreignKey: {
    //     name: 'lessonsId',
    //     allowNull: false
    //   },
    //   as: 'recommendLesson',
    //   onDelete: 'RESTRICT',
    //   onUpdate: 'RESTRICT'
    // });

    lessons.hasMany(models.lessonsRecord, {
      foreignKey: {
        name: 'lessonsId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    lessons.hasMany(models.lessonOption, {
      foreignKey: {
        name: 'lessonsId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    lessons.hasMany(models.reviews, {
      foreignKey: {
        name: 'lessonsId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

  }

  return lessons;
}