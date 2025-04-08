import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

//morphex72
// 6jzGIQYR7AJNm4O7

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
      console.log('Hello');
    });
  } catch (err) {
    console.log(err);
  }
}

main();

//Uncaught exception

process.on('uncaughtException', () => {
  console.log('uncaughtException is caught');
  process.exit(1);
});

// console.log(x);

//unhandledRejection
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected , shutting down`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
