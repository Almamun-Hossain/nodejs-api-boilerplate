const app = require('./config/app');
const variables = require('./config/variables');
const mongoose = require('mongoose');

let server;
mongoose
  .connect(
    `mongodb+srv://${variables.mongoose.user}:${variables.mongoose.password}@${variables.mongoose.url}`,
    variables.mongoose.options,
  )
  .then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(variables.port, () => {
      console.log(`Listening to http://localhost:${variables.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('unhandledRejection', unexpectedErrorHandler);
process.on('uncaughtException', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
