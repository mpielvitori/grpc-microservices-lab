const config = require('config');
const database = require('../database/index.js');

module.exports = {
  getUsers: async (call, callback) => {
    const users = await database.models.users.findAndCountAll({
      offset: call.request.offset,
      limit: call.request.limit === 0 ? config.defaultLimit : call.request.limit,
      raw: true,
    });
    callback(null, {
      numItems: users.rows.length,
      objects: users.rows,
      totalNumItems: users.count,
    });
  },
};

module.exports = {
  getAllUsers: async (call) => {
    const users = await database.models.users.findAll({
      raw: true,
    });
    users.forEach((user) => {
      call.write({
        items: [user],
      });
    });
    call.end();
  },
};
