const database = require('../database/index.js');

module.exports = {
  getUserRoles: async (req, res) => {
    const roles = await database.models.roles.findAll({
      where: {
        userId: req.params.userId,
      },
      raw: true,
    });
    res.send(roles);
  },
};
