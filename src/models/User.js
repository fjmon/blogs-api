const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: { 
      allowNull: false,
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    //  allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:DataTypes.STRING,  
      allowNull: true,
    },
  }, {
      timestamps: false,
      tableName: 'users',
      underscored: true
    });   
    UserTable.associate = (models) => {
      UserTable.hasMany(models.BlogPost, {
        foreignKey: 'user_id'
      })
    }
  return UserTable;
  }
module.exports = UserSchema