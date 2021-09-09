const database = require('../database/index.js');

module.exports = {
  getUserEducation: async (req, res) => {
    console.info('Get user education');
    const education = await database.models.education.findAll({
      where: {
        userId: req.params.userId,
      },
      raw: true,
    });
    res.send(education);
  },
};
