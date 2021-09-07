const database = require('../database');

module.exports = {
  getUsers: async (req, res) => {
    console.info('Get users');
    const users = await database.models.users.findAndCountAll({
      offset: req.params.offset,
      limit: req.params.limit,
      raw: true,
    });
    res.send({
      numItems: users.rows.length,
      objects: users.rows,
      totalNumItems: users.count,
    });
  },
};
