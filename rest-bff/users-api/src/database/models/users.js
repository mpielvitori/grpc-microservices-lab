const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Model {
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  Users.init({
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
