module.exports = (sequelize, DataTypes) => {
  const userAccount = sequelize.define('userAccount', {
    typeAccount: {
      type: DataTypes.STRING, //? url
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING, //? text content
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    studentPoint: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    livingArea: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      underscored: true
    }
  )
  userAccount.associate = models => {
    userAccount.hasOne(models.teacherProfile, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false,
        unique: true
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userAccount.hasMany(models.lessonsRecord, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'learner',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userAccount.hasOne(models.learnerProfile, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userAccount.hasOne(models.following, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userAccount.hasMany(models.profilePost, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'postUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userAccount.hasMany(models.creditCard, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasMany(models.userGroup, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasMany(models.languageSpeak, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasOne(models.userFriend, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'fisrtUserFriend',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasOne(models.userFriend, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'secondUserFriend',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasOne(models.userMessenger, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'messageFrom',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasOne(models.userMessenger, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'messageTo',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasOne(models.groupFeed, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      as: 'groupPostUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userAccount.hasMany(models.reviews, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    userAccount.hasMany(models.postComment, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasMany(models.postLike, {
      foreignKey: {
        name: 'userAccountId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });


  }

  return userAccount;
}