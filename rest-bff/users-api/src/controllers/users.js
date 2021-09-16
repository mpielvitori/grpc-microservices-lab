const config = require('config');
const database = require('../database/index.js');

module.exports = {
  getUsers: async (req, res) => {
    const users = await database.models.users.findAndCountAll({
      offset: !req.query.offset ? config.defaultOffset : req.query.offset,
      limit: !req.query.limit ? config.defaultLimit : req.query.limit,
      raw: true,
    });
    res.send({
      numItems: users.rows.length,
      objects: users.rows,
      totalNumItems: users.count,
    });
  },
};
