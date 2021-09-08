const database = require('../database/index.js');

module.exports = {
  getUserRoles: async (req, res) => {
    console.info('Get user roles');
    const roles = await database.models.roles.findAll({
      userId: req.params.userId,
      raw: true,
    });
    res.send(roles);
  },
};
