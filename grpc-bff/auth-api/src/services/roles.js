const database = require('../database/index.js');

module.exports = {
  getUserRoles: async (call, callback) => {
    const roles = await database.models.roles.findAll({
      where: {
        userId: call.request.userId,
      },
      raw: true,
    });
    callback(null, { userRoles: roles });
  },
};
