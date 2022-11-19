const PROTO_PATH = __dirname + '/todo-manager.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  enums: String,
  longs: String,
  defaults: true,
  arrays: true,
  oneofs: true,
});

const handlers = require('./handlers');

const {todo_proto: toDoProto} = grpc.loadPackageDefinition(packageDefinition);

function main() {
  const server = new grpc.Server();

  server.addService(toDoProto.ToDoService.service, handlers);

  server.bindAsync(
    'localhost:8080',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
    }
  );
}

main();
