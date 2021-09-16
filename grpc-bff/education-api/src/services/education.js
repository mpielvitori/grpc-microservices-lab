const database = require('../database/index.js');

module.exports = {
  getUserEducation: async (call, callback) => {
    const education = await database.models.education.findAll({
      where: {
        userId: call.request.userId,
      },
      raw: true,
    });
    callback(null, { userEducation: education });
  },
};
