const axios = require('axios');
const config = require('config');

const httpClient = axios.create();
httpClient.defaults.timeout = 2000;

module.exports = {
  getUsers: async (req, res) => {
    console.info('BFF Get users');
    try {
      const result = await httpClient.get(`${config.proxyHost}/api/users`, {
        params: {
          offset: req.query.offset,
          limit: req.query.limit,
        },
      });
      const rolesPromises = [];
      result.data.objects.forEach((user) => {
        rolesPromises.push(
          httpClient.get(`${config.proxyHost}/api/auth/roles/${user.id}`),
        );
      });
      const [userRolesResponse] = await Promise.all(rolesPromises);
      const usersData = [];
      result.data.objects.forEach((user) => {
        const userRoles = userRolesResponse.data.filter(
          (userRole) => userRole.userId === user.id,
        ).map((userRole) => (userRole.role));
        usersData.push({
          ...user,
          roles: userRoles,
        });
      });
      res.send({
        numItems: result.data.numItems,
        objects: usersData,
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
