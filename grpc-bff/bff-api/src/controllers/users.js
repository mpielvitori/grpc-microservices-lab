/* eslint-disable max-len */
const {
  getgRPCUsersClient,
  getgRPCSkillsClient,
  getgRPCEducationClient,
  getgRPCAuthClient,
} = require('../helpers/servicesClientBuilder.js');

module.exports = {
  getAllUsers: async (req, res) => {
    console.info('BFF Get users');
    try {
      const result = await new Promise((resolve, reject) => {
        let response = [];
        const call = getgRPCUsersClient().getAllUsers();
        call.on('data', (data) => {
          if (data.items) {
            response = response.concat(data.items);
          } else {
            response = response.concat(data);
          }
        });
        call.on('end', () => {
          resolve(response);
        });
        call.on('error', (e) => {
          reject(e);
        });
      });
      // Roles calls
      const rolesPromises = [];
      result.forEach((user) => {
        rolesPromises.push(
          new Promise((resolve, reject) => {
            getgRPCAuthClient().getUserRoles({ userId: user.id }, (err, response) => {
              if (err) reject(err);
              else (resolve(response));
            });
          }),
        );
      });
      const userRolesResponse = await Promise.all(rolesPromises);
      // Skills calls
      const skillsPromises = [];
      result.forEach((user) => {
        skillsPromises.push(
          new Promise((resolve, reject) => {
            getgRPCSkillsClient().getUserSkills({ userId: user.id }, (err, response) => {
              if (err) reject(err);
              else (resolve(response));
            });
          }),
        );
      });
      const userSkillsResponse = await Promise.all(skillsPromises);
      // Education calls
      const educationPromises = [];
      result.forEach((user) => {
        educationPromises.push(
          new Promise((resolve, reject) => {
            getgRPCEducationClient().getUserEducation({ userId: user.id }, (err, response) => {
              if (err) reject(err);
              else (resolve(response));
            });
          }),
        );
      });
      const userEducationResponse = await Promise.all(educationPromises);
      // Data sanitization
      const usersData = [];
      result.forEach((user) => {
        const userRoles = userRolesResponse.flatMap((response) => [response.userRoles]).flat().filter(
          (userRole) => userRole.userId === user.id,
        ).map((userRole) => (userRole.role));
        const userSkills = userSkillsResponse.flatMap((response) => [response.userSkills]).flat().filter(
          (userSkill) => userSkill.userId === user.id,
        ).map((userSkill) => ({
          tech: userSkill.tech, seniority: userSkill.seniority,
        }));
        const parsedUserEducation = userEducationResponse.flatMap((response) => [response.userEducation]).flat().filter(
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

