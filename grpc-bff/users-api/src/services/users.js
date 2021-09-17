const database = require('../database/index.js');

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
