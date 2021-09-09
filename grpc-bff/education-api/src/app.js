const PROTO_PATH = `${__dirname}/proto/education.proto`;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('config');
const { getUserEducation } = require('./services/education.js');

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
const educationProto = grpc.loadPackageDefinition(packageDefinition).education;
function main() {
  const server = new grpc.Server();
  server.addService(educationProto.EducationService.service, { getUserEducation });
  server.bindAsync(
    `${config.grpc.host}:${config.grpc.port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Error starting gRPC education server', err);
      }
      server.start();
      console.log(`Server running at ${port}`);
    },
  );
}
main();
