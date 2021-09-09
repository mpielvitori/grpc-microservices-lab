const PROTO_PATH = `${__dirname}/proto/auth.proto`;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('config');
const { getUserRoles } = require('./services/roles.js');

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
const authProto = grpc.loadPackageDefinition(packageDefinition).auth;
function main() {
  const server = new grpc.Server();
  server.addService(authProto.AuthService.service, { getUserRoles });
  server.bindAsync(
    `${config.grpc.host}:${config.grpc.port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Error starting gRPC auth server', err);
      }
      server.start();
      console.info(`Server running at ${port}`);
    },
  );
}
main();
