const PROTO_PATH = `${__dirname}/proto/users.proto`;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('config');
const { getUsers, getAllUsers } = require('./services/users.js');

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
function main() {
  const server = new grpc.Server();
  server.addService(usersProto.UsersService.service, { getUsers, getAllUsers });
  server.bindAsync(
    `${config.grpc.host}:${config.grpc.port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error('Error starting gRPC users server', err);
      }
      server.start();
      console.info(`Server running at ${port}`);
    },
  );
}
main();
