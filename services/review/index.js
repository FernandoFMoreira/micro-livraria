const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const reviewsProtoDefinition = protoLoader.loadSync(
  path.join(__dirname, '../../proto/review.proto'),
  { keepCase: true, longs: String, enums: String, arrays: true }
);

const reviewsPackageDefinition = grpc.loadPackageDefinition(reviewsProtoDefinition);
const reviewsData = [];
const server = new grpc.Server();

server.addService(reviewsPackageDefinition.ReviewService.service, {
  GetReviews: (call, callback) => {
    const productReviews = reviewsData.filter(r => r.productId == call.request.id);
    callback(null, { reviews: productReviews });
  },
  AddReview: (call, callback) => {
    const review = call.request;
    review.date = new Date().toISOString();
    reviewsData.push(review);
    callback(null, { success: true, message: 'Avaliação adicionada com sucesso!' });
  }
});

server.bindAsync('0.0.0.0:3003', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Reviews Service running at http://127.0.0.1:3003');
});
