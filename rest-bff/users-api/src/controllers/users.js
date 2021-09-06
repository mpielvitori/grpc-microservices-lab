const database = require('../database');

console.log('DB models', database.models);
module.exports = {
  getUsers: async (req, res) => {
    console.info('Get users');
    const users = await database.models.users.findAll();
    res.send(users);
  },
};
