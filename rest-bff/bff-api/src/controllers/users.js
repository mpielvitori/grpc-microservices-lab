const axios = require('axios');
const config = require('config');

module.exports = {
  getUsers: async (req, res) => {
    console.info('BFF Get users');
    try {
      const result = await axios.get(`${config.proxyHost}/api/users`, {
        params: {
          offset: req.query.offset,
          limit: req.query.limit,
        },
      });
      res.send({
        numItems: result.data.numItems,
        objects: result.data.objects,
        totalNumItems: result.data.totalNumItems,
      });
    } catch (error) {
      console.error('Error getting users info', error);
      res.status(
        error.response && error.response.status ? error.response.status : 500,
      ).send({
        exception: error,
        message: 'Error getting users info',
      });
    }
  },
};
