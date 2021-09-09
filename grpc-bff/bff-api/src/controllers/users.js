/* eslint-disable max-len */
const {
  getgRPCUsersClient,
  getgRPCSkillsClient,
  getgRPCEducationClient,
  getgRPCAuthClient,
} = require('../helpers/servicesClientBuilder.js');

module.exports = {
  getUsers: async (req, res) => {
    console.info('BFF Get users');
    try {
      const result = await new Promise((resolve, reject) => {
        getgRPCUsersClient().getUsers({ offset: req.query.offset, limit: req.query.limit }, (err, response) => {
          if (err) reject(err);
          else (resolve(response));
        });
      });
      console.log('USERS RESP', result);
      // Roles calls
      const rolesPromises = [];
      result.objects.forEach((user) => {
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
      console.log('ROLES RESP', userRolesResponse);
      // Skills calls
      const skillsPromises = [];
      result.objects.forEach((user) => {
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
      console.log('SKILLS RESP', userSkillsResponse);
      // Education calls
      const educationPromises = [];
      result.objects.forEach((user) => {
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
      console.log('EDUCATION RESP', userEducationResponse);
      // Data sanitization
      const usersData = [];
      result.objects.forEach((user) => {
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

      res.send({
        numItems: result.numItems,
        objects: usersData,
        totalNumItems: result.totalNumItems,
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

