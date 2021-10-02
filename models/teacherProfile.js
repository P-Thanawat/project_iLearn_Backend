module.exports = (sequelize, DataTypes) => {
  const teacherProfile = sequelize.define('teacherProfile', {
    intoduceContent: {
      type: DataTypes.STRING, //? url
      allowNull: false
    },
    presentText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aboutTeacher: {
      type: DataTypes.STRING, //? text content
      allowNull: false,
    },
    recommendLesson: {
      type: DataTypes.STRING, //? text content
      allowNull: false,
    },
    ableBooking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ableContact: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
    {
      underscored: true
    }
  )
  teacherProfile.associate = models => {
    teacherProfile.belongsTo(models.userAccount, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false,
        unique: true
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    teacherProfile.hasMany(models.lessons, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    // teacherProfile.belongsTo(models.lessons, {
    //   foreignKey: {
    //     name: 'lessonsId',
    //     allowNull: false
    //   },
    //   as: 'recommendLesson',
    //   onDelete: 'RESTRICT',
    //   onUpdate: 'RESTRICT'
    // });

    teacherProfile.hasMany(models.reviews, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    teacherProfile.hasMany(models.teacherSubject, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    teacherProfile.hasMany(models.available, {
      foreignKey: {
        name: 'teacherProfileId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  }

  return teacherProfile;
}