/* eslint-disable max-len */
const USERS_PROTO_PATH = `${__dirname}/../proto/users.proto`;
const SKILLS_PROTO_PATH = `${__dirname}/../proto/skills.proto`;
const EDUCATION_PROTO_PATH = `${__dirname}/../proto/education.proto`;
const AUTH_PROTO_PATH = `${__dirname}/../proto/auth.proto`;

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('config');

let gRPCUsersClient;
let gRPCSkillsClient;
let gRPCEducationClient;
let gRPCAuthClient;

module.exports = {
  getgRPCUsersClient: () => {
    if (!gRPCUsersClient) {
      const usersPackageDefinition = protoLoader.loadSync(
        USERS_PROTO_PATH,
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      );
      const usersProto = grpc.loadPackageDefinition(usersPackageDefinition).users;
      gRPCUsersClient = new usersProto.UsersService(
        `${config.usersAPIHost}:${config.grpcPort}`, grpc.credentials.createInsecure(),
      );
    }
    return gRPCUsersClient;
  },
  getgRPCSkillsClient: () => {
    if (!gRPCSkillsClient) {
      const skillsPackageDefinition = protoLoader.loadSync(
        SKILLS_PROTO_PATH,
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      );
      const skillsProto = grpc.loadPackageDefinition(skillsPackageDefinition).skills;
      gRPCSkillsClient = new skillsProto.SkillsService(
        `${config.skillsAPIHost}:${config.grpcPort}`, grpc.credentials.createInsecure(),
      );
    }
    return gRPCSkillsClient;
  },
  getgRPCEducationClient: () => {
    if (!gRPCEducationClient) {
      const educationPackageDefinition = protoLoader.loadSync(
        EDUCATION_PROTO_PATH,
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      );
      const educationProto = grpc.loadPackageDefinition(educationPackageDefinition).education;
      gRPCEducationClient = new educationProto.EducationService(
        `${config.educationAPIHost}:${config.grpcPort}`, grpc.credentials.createInsecure(),
      );
    }
    return gRPCEducationClient;
  },
  getgRPCAuthClient: () => {
    if (!gRPCAuthClient) {
      const authPackageDefinition = protoLoader.loadSync(
        AUTH_PROTO_PATH,
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      );
      const authProto = grpc.loadPackageDefinition(authPackageDefinition).auth;
      gRPCAuthClient = new authProto.AuthService(
        `${config.authAPIHost}:${config.grpcPort}`, grpc.credentials.createInsecure(),
      );
    }
    return gRPCAuthClient;
  },
};
