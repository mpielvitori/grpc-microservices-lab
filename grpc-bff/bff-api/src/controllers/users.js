/* eslint-disable max-len */
const PROTO_PATH = `${__dirname}/../proto/users.proto`;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('config');

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);
const usersProto = grpc.loadPackageDefinition(packageDefinition).users;
const client = new usersProto.UsersService(
  `${config.usersAPIHost}:${config.grpcPPort}`, grpc.credentials.createInsecure(),
);

module.exports = {
  getUsers: async (req, res) => {
    console.info('BFF Get users');
    try {
      // const result = await httpClient.get(`${config.proxyHost}/api/users`, {
      //   params: {
      //     offset: req.query.offset,
      //     limit: req.query.limit,
      //   },
      // });
      // // Roles calls
      // const rolesPromises = [];
      // result.data.objects.forEach((user) => {
      //   rolesPromises.push(
      //     httpClient.get(`${config.proxyHost}/api/auth/roles/${user.id}`),
      //   );
      // });
      // const userRolesResponse = await Promise.all(rolesPromises);
      // // Skills calls
      // const skillsPromises = [];
      // result.data.objects.forEach((user) => {
      //   skillsPromises.push(
      //     httpClient.get(`${config.proxyHost}/api/skills/${user.id}`),
      //   );
      // });
      // const userSkillsResponse = await Promise.all(skillsPromises);
      // // Education calls
      // const educationPromises = [];
      // result.data.objects.forEach((user) => {
      //   educationPromises.push(
      //     httpClient.get(`${config.proxyHost}/api/education/${user.id}`),
      //   );
      // });
      // const userEducationResponse = await Promise.all(educationPromises);
      // // Data sanitization
      // const usersData = [];
      // result.data.objects.forEach((user) => {
      //   const userRoles = userRolesResponse.flatMap((response) => [response.data]).flat().filter(
      //     (userRole) => userRole.userId === user.id,
      //   ).map((userRole) => (userRole.role));
      //   const userSkills = userSkillsResponse.flatMap((response) => [response.data]).flat().filter(
      //     (userSkill) => userSkill.userId === user.id,
      //   ).map((userSkill) => ({
      //     tech: userSkill.tech, seniority: userSkill.seniority,
      //   }));
      //   const parsedUserEducation = userEducationResponse.flatMap((response) => [response.data]).flat().filter(
      //     (userEducation) => userEducation.userId === user.id,
      //   ).map((userEducation) => ({
      //     title: userEducation.title, level: userEducation.level,
      //   }));
      //   usersData.push({
      //     ...user,
      //     roles: userRoles,
      //     skills: userSkills,
      //     education: parsedUserEducation,
      //   });
      // });
      const result = await new Promise((resolve, reject) => {
        client.getUsers({ offset: req.query.offset, limit: req.query.limit }, (err, response) => {
          if (err) reject(err);
          else (resolve(response));
        });
      });
      res.send(result);

      // res.send({
      //   numItems: result.data.numItems,
      //   objects: usersData,
      //   totalNumItems: result.data.totalNumItems,
      // });
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
