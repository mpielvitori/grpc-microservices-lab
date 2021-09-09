const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Skills extends Model {}
  Skills.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tech: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    seniority: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  }, {
    modelName: 'skills',
    sequelize,
  });

  return Skills;
};
