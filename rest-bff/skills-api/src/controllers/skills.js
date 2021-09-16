const database = require('../database/index.js');

module.exports = {
  getUserSkills: async (req, res) => {
    const skills = await database.models.skills.findAll({
      where: {
        userId: req.params.userId,
      },
      raw: true,
    });
    res.send(skills);
  },
};
