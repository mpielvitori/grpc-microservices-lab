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
      // Roles calls
      const rolesPromises = [];
      result.data.objects.forEach((user) => {
        rolesPromises.push(
          httpClient.get(`${config.proxyHost}/api/auth/roles/${user.id}`),
        );
      });
      const [userRolesResponse] = await Promise.all(rolesPromises);
      // Skills calls
      const skillsPromises = [];
      result.data.objects.forEach((user) => {
        skillsPromises.push(
          httpClient.get(`${config.proxyHost}/api/skills/${user.id}`),
        );
      });
      const [userSkillsResponse] = await Promise.all(skillsPromises);
      // Education calls
      const educationPromises = [];
      result.data.objects.forEach((user) => {
        educationPromises.push(
          httpClient.get(`${config.proxyHost}/api/education/${user.id}`),
        );
      });
      const [userEducationResponse] = await Promise.all(educationPromises);

      // Data sanitization
      const usersData = [];
      result.data.objects.forEach((user) => {
        const userRoles = userRolesResponse.data.filter(
          (userRole) => userRole.userId === user.id,
        ).map((userRole) => (userRole.role));
        const userSkills = userSkillsResponse.data.filter(
          (userSkill) => userSkill.userId === user.id,
        ).map((userSkill) => ({
          charge: userSkill.charge, seniority: userSkill.seniority,
        }));
        const parsedUserEducation = userEducationResponse.data.filter(
          (userEducation) => userEducation.userId === user.id,
        ).map((userEducation) => ({
          title: userEducation.title, level: userEducation.level,
        }));
        usersData.push({
          ...user,
          roles: userRoles,
          skills: userSkills,
          education: parsedUserEducation,
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
