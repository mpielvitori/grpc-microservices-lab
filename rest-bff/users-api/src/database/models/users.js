const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Model {
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  }, {
    modelName: 'users',
    sequelize,
  });

  return Users;
};
