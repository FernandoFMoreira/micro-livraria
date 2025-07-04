const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  'proto/review.proto',
  { keepCase: true, longs: String, enums: String, arrays: true }
);
const ReviewService = grpc.loadPackageDefinition(packageDefinition).ReviewService;
module.exports = new ReviewService('127.0.0.1:3003', grpc.credentials.createInsecure());
