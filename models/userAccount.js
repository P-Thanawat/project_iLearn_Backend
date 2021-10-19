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
    },
    credit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    readMessage: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
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
        name: 'fisrtUserFriend',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasOne(models.userFriend, {
      foreignKey: {
        name: 'secondUserFriend',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasMany(models.userMessenger, {
      foreignKey: {
        name: 'messageFrom',
        allowNull: false
      },
      as: 'messageFromUser',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    userAccount.hasMany(models.userMessenger, {
      foreignKey: {
        name: 'messageTo',
        allowNull: false
      },
      as: 'messageToUser',
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
    userAccount.hasMany(models.commentReply, {
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