const PROTO_PATH = `${__dirname}/proto/skills.proto`;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('config');
const { getUserSkills } = require('./services/skills.js');

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
const skillsProto = grpc.loadPackageDefinition(packageDefinition).skills;
function main() {
  const server = new grpc.Server();
  server.addService(skillsProto.SkillsService.service, { getUserSkills });
  server.bindAsync(
    `${config.grpc.host}:${config.grpc.port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Error starting gRPC skills server', err);
      }
      server.start();
      console.info(`Server running at ${port}`);
    },
  );
}
main();
