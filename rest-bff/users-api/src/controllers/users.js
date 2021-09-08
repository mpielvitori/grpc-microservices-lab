const database = require('../database/index.js');

module.exports = {
  getUsers: async (req, res) => {
    console.info('Get users');
    const users = await database.models.users.findAndCountAll({
      offset: req.query.offset,
      limit: req.query.limit,
      raw: true,
    });
    res.send({
      numItems: users.rows.length,
      objects: users.rows,
      totalNumItems: users.count,
    });
  },
};
