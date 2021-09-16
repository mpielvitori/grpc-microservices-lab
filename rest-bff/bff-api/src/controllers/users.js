/* eslint-disable max-len */
const axios = require('axios');
const config = require('config');

const httpClient = axios.create();
httpClient.defaults.timeout = 10000;
const PAGE_LIMIT = 20;

module.exports = {
  getAllUsers: async (req, res) => {
    console.info('BFF Get users');
    try {
      const result = await httpClient.get(`${config.proxyHost}/api/users`);
      const usersResult = result.data.objects;
      if (PAGE_LIMIT < result.data.totalNumItems) {
        const usersPromises = [];
        for (let offset = PAGE_LIMIT; offset < result.data.totalNumItems;) {
          usersPromises.push(httpClient.get(`${config.proxyHost}/api/users`, {
            params: {
              offset,
              limit: PAGE_LIMIT,
            },
          }));
          offset += PAGE_LIMIT;
        }

        const usersResponse = await Promise.all(usersPromises);
        usersResult.push(...usersResponse.flatMap((response) => [response.data.objects]).flat());
      }
      // Roles calls
      const rolesPromises = [];
      usersResult.forEach((user) => {
        rolesPromises.push(
          httpClient.get(`${config.proxyHost}/api/auth/roles/${user.id}`),
        );
      });
      const userRolesResponse = await Promise.all(rolesPromises);
      // Skills calls
      const skillsPromises = [];
      usersResult.forEach((user) => {
        skillsPromises.push(
          httpClient.get(`${config.proxyHost}/api/skills/${user.id}`),
        );
      });
      const userSkillsResponse = await Promise.all(skillsPromises);
      // Education calls
      const educationPromises = [];
      usersResult.forEach((user) => {
        educationPromises.push(
          httpClient.get(`${config.proxyHost}/api/education/${user.id}`),
        );
      });
      const userEducationResponse = await Promise.all(educationPromises);
      // Data sanitization
      const usersData = [];
      usersResult.forEach((user) => {
        const userRoles = userRolesResponse.flatMap((response) => [response.data]).flat().filter(
          (userRole) => userRole.userId === user.id,
        ).map((userRole) => (userRole.role));
        const userSkills = userSkillsResponse.flatMap((response) => [response.data]).flat().filter(
          (userSkill) => userSkill.userId === user.id,
        ).map((userSkill) => ({
          tech: userSkill.tech, seniority: userSkill.seniority,
        }));
        const parsedUserEducation = userEducationResponse.flatMap((response) => [response.data]).flat().filter(
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
      res.send(usersData);
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
