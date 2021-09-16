/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = require('config');
const sequelizeFixtures = require('sequelize-fixtures');

let database;

if (!database) {
  database = new Sequelize({
    ...config.sequelize,
    logging: config.sequelize.logging === 'true',
  });
  const modelsPath = `${__dirname}/models`;
  fs.readdirSync(modelsPath)
    .filter((filePath) => filePath.match(/.*\.js$/))
    .forEach((file) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(path.join(modelsPath, file))(database);
    });

  const modelsPromises = [];
  Object.keys(database.models).forEach((modelName) => {
    modelsPromises.push(database.models[modelName].sync({ force: config.forceSync === 'true' }).then(() => {
      console.info(`${modelName} synced`);
      if (database.models[modelName].associate) {
        database.models[modelName].associate(database.models);
      }
    }));
  });
  Promise.all(modelsPromises).then(() => {
    sequelizeFixtures.loadFile(
      path.resolve(path.join(__dirname, '/fixtures/*.json')),
      database.models,
    );
  });
}

module.exports = database;
