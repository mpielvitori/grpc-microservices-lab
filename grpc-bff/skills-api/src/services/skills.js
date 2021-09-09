const database = require('../database/index.js');

module.exports = {
  getUserSkills: async (call, callback) => {
    console.info('Get user skills by gRPC');
    const skills = await database.models.skills.findAll({
      where: {
        userId: call.request.userId,
      },
      raw: true,
    });
    callback(null, { userSkills: skills });
  },
};
