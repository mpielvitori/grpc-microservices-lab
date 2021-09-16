const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Roles extends Model {}
  Roles.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
    modelName: 'roles',
    sequelize,
  });

  return Roles;
};
