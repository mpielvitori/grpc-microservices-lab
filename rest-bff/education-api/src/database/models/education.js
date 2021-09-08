const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Education extends Model {}
  Education.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    modelName: 'education',
    sequelize,
  });

  return Education;
};
